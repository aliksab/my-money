const express = require("express");
const mongoose = require("mongoose");
const config = require("config");
const chalk = require("chalk");
const cors = require("cors");
const path = require("path");
const routes = require("./routes");
const TelegramApi = require("node-telegram-bot-api");
const User = require("./models/User");
const Invoice = require("./models/Invoice");
const InvoiceManipulation = require("./models/InvoiceManipulation");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use("/api", routes);
app.use("/uploads", express.static("uploads"));

const tgToken = config.get("tgApiToken");
const bot = new TelegramApi(tgToken, { polling: true });

const PORT = config.get("port") ?? 8080;

if (process.env.NODE_ENV === "production") {
  app.use("/", express.static(path.join(__dirname, "client")));

  const indexPath = path.join(__dirname, "client", "index.html");

  app.get("*", (req, res) => {
    console.log(res);
    res.sendFile(indexPath);
  });
}

async function start() {
  try {
    await mongoose.connect(config.get("mongoUri"));
    app.listen(PORT, () => {
      console.log(chalk.green(`Server has been started on port ${PORT}...`));
    });
  } catch (error) {
    console.log(chalk.red(error.message));
    process.exit(1);
  }
}

start();
// const commands = [
//     {
//         command: "start",
//         description: "Запуск бота"
//     },
//     {
//         command: "help",
//         description: "Раздел помощи"
//     },
// ]

// bot.setMyCommands(commands);

bot.on("message", async (msg) => {
  const text = msg.text;
  const chatId = msg.chat.id;
  let user = await User.find();
  user = user.filter((user) => user.userName == msg.from.id);
  let userId = "";
  user.map((u) => (userId = u._id));
  try {
    if (text.split(" ")[0] === "/start") {
      if (text.split(" ")[1]) {
        const userData = text.split(" ")[1];
        let user = await User.findById(userData);
        user.userName = msg.from.id;
        await User.findByIdAndUpdate(userData, user, { new: true });
      }
      if (userId === "") {
        return bot.sendMessage(
          chatId,
          "Произошла ошибка. Попробуйте подключиться через сайт или обратитесь в поддержку."
        );
      } else {
        await bot.sendMessage(
          chatId,
          "Добро пожаловать в телеграмм бота Вашего личного помощника my-money"
        );
        return userId;
      }
    }

    if (text == "/help") {
      return bot.sendMessage(
        chatId,
        "Оставьте Ваше обращение в боте обратной связи @MyMoney_Error_bot"
      );
    }

    bot.sendMessage(chatId, `Меню бота`, {
      reply_markup: {
        //Добавляем пользователю меню-клавиатуру
        keyboard: [
          ["💸 Добавить новую транзакцию"],
          ["📃 Список транзакций"],
          ["❌ Закрыть меню"],
        ],
        //Подгоняем размер меню-клавиатуры
        resize_keyboard: true,
      },
    });

    if (text == "💸 Добавить новую транзакцию") {
      const list = await Invoice.find();
      const result = list.filter((invoice) => invoice.userId == String(userId));

      result.map((invoice) =>
        bot.sendMessage(
          chatId,
          invoice.name + " Сумма средств " + invoice.amount,
          {
            reply_markup: {
              inline_keyboard: [
                [
                  {
                    text: "Добавить транзакцию по счёту",
                    callback_data: invoice._id,
                  },
                ],
              ],
            },
          }
        )
      );
    }
    if (text == "📃 Список транзакций") {
      const list = await InvoiceManipulation.find();
      const result = list.filter(
        (manipulation) => manipulation.userId == String(userId)
      );
      result.map((manipulation) => {
        bot.sendMessage(
          chatId,
          (manipulation.type === "expense" ? "Расход" : "Доход") +
            `\n<b>Сумма средств:</b> ` +
            manipulation.amount,
          {
            parse_mode: "HTML",
          }
        );
      });
    }
    if (text == "❌ Закрыть меню") {
      return bot.sendMessage(chatId, "Меню закрыто", {
        reply_markup: {
          remove_keyboard: true,
        },
      });
    }
  } catch (error) {
    console.log(error);
  }
});
bot.on("callback_query", async (ctx) => {
  const updateInvoice = await Invoice.findById(ctx.data)
  const chatId = ctx.message.chat.id;
  let user = await User.find();
  user = user.filter((user) => user.userName == ctx.from.id);
  let userId = "";
  user.map((u) => (userId = u._id));
  try {
    let newTransaction = {
      type: "",
      invoiceId: ctx.data,
      amount: "",
      manipulation: "other",
      description: "",
      userId: String(userId),
    };
    bot.sendMessage(
      chatId,
      'Введите данные транзакции. Пример: "Доход 1000 еда"'
    );
    await bot.on("message", async (type) => {
      const res = type.text.split(" ");
      if (res[0].toLowerCase() === "доход") {
        newTransaction.type = "profit";
        res.shift();
      } else if (res[0].toLowerCase() === "расход") {
        newTransaction.type = "expense";
        res.shift();
      } else {
        return;
      }

      if (Number(res[0]) > 0) {
        newTransaction.amount = Number(res[0]);
        res.shift();
      } else {
        bot.sendMessage(chatId, "Сумма транзакции должна быть больше 0");
        return;
      }

      newTransaction.description = res.join(" ");

      if (newTransaction.description != "") {
        await InvoiceManipulation.create({ ...newTransaction });
        let newAmount = updateInvoice.amount;
        newTransaction.type === "profit"
            ? (newAmount += Number(newTransaction.amount))
            : (newAmount -= Number(newTransaction.amount));
        updateInvoice.amount = newAmount
        await Invoice.findByIdAndUpdate(
          newTransaction.invoiceId,
          updateInvoice,
          { new: true }
        );
        try {
          return bot.sendMessage(chatId, "Новая транзакция добавлена");
        } catch (error) {
          console.log(error);
        }
      }
    });
  } catch (error) {
    console.log(error);
  }
});
