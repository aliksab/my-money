const express = require('express')
const mongoose = require('mongoose')
const config = require('./config/')
const chalk = require('chalk')
const cors = require('cors')
const path = require('path')
const routes = require('./routes')
const  TelegramApi = require('node-telegram-bot-api')
const app = express()

app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use(cors())
app.use('/api', routes)
// app.use('/uploads', express.static('uploads'));


const tgToken = config.get('tgApiToken')
const bot = new TelegramApi(tgToken, { polling: true })

const PORT = config.get('port') ?? 8080

if (process.env.NODE_ENV === 'production') {
    app.use('/', express.static(path.join(__dirname, 'client')))

    const indexPath = path.join(__dirname, 'client', 'index.html')

    app.get('*', (req, res) => {
        console.log(res);
        res.sendFile(indexPath)
    })
}

async function start() {
    try {
        await mongoose.connect(config.get('mongoUri'))
        app.listen( PORT, () => {
            console.log(chalk.green(`Server has been started on port ${PORT}...`));
        }) 
    } catch (error) {
        console.log(chalk.red(error.message))
        process.exit(1)
    }
    
}

start()
const commands = [
    {
        command: "start",
        description: "Запуск бота"
    },
    {
        command: "help",
        description: "Раздел помощи"
    },
]

bot.setMyCommands(commands);

bot.on('message', async msg => {
    const text = msg.text;
    const chatId = msg.chat.id;
    try {
        if (text === '/start') {
            return bot.sendMessage(chatId, 'Добро пожаловать в телеграмм бота Вашего личного помощника my-money')
        }
        bot.sendMessage(msg.chat.id, `Меню бота`, {
            reply_markup: {
                //Добавляем пользователю меню-клавиатуру
                keyboard: [
                    ['💰 Мои счета', '📊 Аналитика'],
                    ['📃 Список транзакций', '🗓 Календарь'],
                    ['❌ Закрыть меню']
                ],
                //Подгоняем размер меню-клавиатуры
                resize_keyboard: true
            }
        })
        if (text == '❌ Закрыть меню') {
            return bot.sendMessage(chatId, 'Меню закрыто', {
                reply_markup: {
                    remove_keyboard: true
                }
            })
        }
        if (text == '💰 Мои счета') {
            await bot.sendMessage(chatId, 'Мои счета')
        }




        return bot.sendMessage(chatId, 'I don`t now')
    } catch (error) {
        console.log(error);
    }
})