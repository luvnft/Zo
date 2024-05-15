const TelegramBot = require('node-telegram-bot-api');

const bot = new TelegramBot('', { polling: true });

bot.on('message', (msg) => {
    const chatId = msg.chat.id;
    const messageText = msg.text;

    if (messageText === '/start') {
        bot.sendMessage(chatId, 'Hello! Welcome to ZO House Booking App. THIS IS NOT REAL ZO HOUSE BOOKING APP. This is a demo application built for a hackathon and is no way affiliated with Zo House');
    }

    if (messageText === '/book') {
        bot.sendMessage(chatId, 'Click the button below to book a room', {
            reply_markup: {
                inline_keyboard: [
                    [
                        {
                            text: 'Book a Room',
                            url: 'https://zo-house-booking-telegram.vercel.app/'
                        }
                    ]
                ]
            }
        });
    }


});

bot.on('polling_error', (error) => {
    console.log(error);
});