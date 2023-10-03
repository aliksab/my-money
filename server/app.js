const express = require('express')
const mongoose = require('mongoose')
const config = require('config')
const chalk = require('chalk')
const cors = require('cors')
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
    try {
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
        if(msg.text == '❌ Закрыть меню') {
            await bot.sendMessage(msg.chat.id, 'Меню закрыто', {
                reply_markup: {
                    remove_keyboard: true
                }
            })
        }
        if(msg.text == '💰 Мои счета') {
            // await bot.sendMessage(msg.chat.id, 'Мои счета', {
            //     reply_markup: {
            //         remove_keyboard: true
            //     }
            // })
            await bot.sendMessage(msg.chat.id, 'Мои счета')
        }
    } catch (error) {
        console.log(error);
    }
})