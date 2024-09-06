"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const telegraf_1 = require("telegraf");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config(); // Load environment variables from .env file
const bot = new telegraf_1.Telegraf(process.env.BOT_TOKEN);
const web_url = "https://co3-client.onrender.com"; // Your web app URL
bot.start((ctx) => {
    const userId = ctx.from?.id;
    const firstName = ctx.from?.first_name;
    const lastName = ctx.from?.last_name;
    const username = ctx.from?.username;
    console.log("firstname, last,and username", userId, firstName, lastName, username);
    // Construct the URL with Telegram user ID and user info
    const webAppUrl = `${web_url}?user_id=${userId}&first_name=${encodeURIComponent(firstName || "")}&last_name=${encodeURIComponent(lastName || "")}&username=${encodeURIComponent(username || "")}`;
    console.log("webUrl", webAppUrl);
    ctx.reply("Welcome! Click the button to open the web app.", {
        reply_markup: {
            keyboard: [
                [
                    {
                        text: "web app",
                        web_app: {
                            url: webAppUrl,
                        },
                    },
                ],
            ],
        },
    });
});
// Launch bot
bot.launch();
