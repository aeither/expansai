import { Bot } from 'grammy'

if (!process.env.BOT_TOKEN) throw new Error("BOT_TOKEN not found");
const bot = new Bot(process.env['BOT_TOKEN']) // <-- Set your token in the vercel environment variable

if (!process.env.WEBHOOK) throw new Error("WEBHOOK not found");
bot.api.setWebhook(process.env['WEBHOOK'])
