import { Telegraf } from "telegraf";
import dotenv from "dotenv";

dotenv.config(); // Load environment variables from .env file

const bot = new Telegraf(process.env.BOT_TOKEN as string);

const web_url = "https://co3-client.onrender.com"; // Your web app URL

bot.start((ctx) => {
  const userId = ctx.from?.id;
  const firstName = ctx.from?.first_name;
  const lastName = ctx.from?.last_name;
  const username = ctx.from?.username;
  console.log(
    "firstname, last,and username",
    userId,
    firstName,
    lastName,
    username
  );
  // Construct the URL with Telegram user ID and user info
  const webAppUrl = `${web_url}?user_id=${userId}&first_name=${encodeURIComponent(
    firstName || ""
  )}&last_name=${encodeURIComponent(
    lastName || ""
  )}&username=${encodeURIComponent(username || "")}`;

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
