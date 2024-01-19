const TelegramBot = require("node-telegram-bot-api");
const db = require("../config.mongodb");
const randomNumber = require("random-number");

const telegram_bot_token = db.collection("telegram_bot_token");
const usersCollection = db.collection("users");
class TelegramBotFunc {
  async registerBot(req, res) {
    const bot = new TelegramBot(process.env.BOTKEY);
    const randomPin = String(
      randomNumber({
        min: 100000,
        max: 999999,
        integer: true,
      })
    );

    const opts = {
      reply_markup: {
        keyboard: [
          [
            {
              text: "Kontakni Yuborish",
              request_contact: true,
            },
          ],
        ],
        resize_keyboard: true,
        one_time_keyboard: true,
      },
    };
    const userName = req?.body?.message?.chat?.username || undefined;
    const phoneNumber = req?.body?.message?.contact?.phone_number || undefined;
    const name = req?.body?.message?.contact?.first_name || undefined;

    if (req?.body?.message?.text === "/start") {
      bot.sendMessage(
        req.body.message.from.id,
        `Salom ${userName} 👋
        Caramella ning rasmiy botiga xush kelibsiz
        
        ⬇️ Kontaktingizni yuboring (tugmani bosib)`,
        opts
      );
    }
    const checkUserExist = await usersCollection.findOne({ phoneNumber });
    const passcodeChecked = await telegram_bot_token.findOne({ userName });
    if (phoneNumber !== undefined) {
      if (checkUserExist === null && passcodeChecked === null) {
        bot.sendMessage(
          req.body.message.from.id,
          `Sizning codingiz: \`${randomPin}\``,
          { parse_mode: "Markdown" }
        );
        bot.sendMessage(
          req.body.message.from.id,
          "Yangi kod olish uchun /login ni bosing"
        );
        try {
          await telegram_bot_token.createIndex(
            { createdAt: 1 },
            { expireAfterSeconds: 300 }
          );
          await telegram_bot_token.insertOne({
            userName: userName,
            passCode: randomPin,
            createdAt: new Date(),
          });
          await usersCollection.insertOne({
            name: name,
            phoneNumber: phoneNumber,
            userName: userName,
            createdAt: new Date(),
          });
        } catch (err) {
          console.log(err);
        }
      } else if (checkUserExist !== null && passcodeChecked !== null) {
        bot.sendMessage(
          req.body.message.from.id,
          "Eski kodingiz hali ham kuchda ☝️"
        );
      } else if (checkUserExist !== null && passcodeChecked === null) {
        bot.sendMessage(
          req.body.message.from.id,
          `Sizning codingiz: \`${randomPin}\``,
          { parse_mode: "Markdown" }
        );
        bot.sendMessage(
          req.body.message.from.id,
          "Yangi kod olish uchun /login ni bosing"
        );
        try {
          await telegram_bot_token.createIndex(
            { createdAt: 1 },
            { expireAfterSeconds: 300 }
          );
          await telegram_bot_token.insertOne({
            userName: userName,
            passCode: randomPin,
            createdAt: new Date(),
          });
        } catch (err) {
          console.log(err);
        }
      }
    }

    if (req?.body?.message?.text === "/login") {
      if (passcodeChecked === null) {
        bot.sendMessage(
          req.body.message.from.id,
          `Sizning codingiz: \`${randomPin}\``,
          { parse_mode: "Markdown" }
        );
        try {
          await telegram_bot_token.createIndex(
            { createdAt: 1 },
            { expireAfterSeconds: 300 }
          );
          await telegram_bot_token.insertOne({
            userName: userName,
            passCode: randomPin,
            createdAt: new Date(),
          });
        } catch (err) {
          console.log(err);
        }
      } else {
        bot.sendMessage(
          req.body.message.from.id,
          "Eski kodingiz hali ham kuchda ☝️"
        );
      }
    }

    res.status(200).json({ success: true });
  }
}

module.exports = new TelegramBotFunc();
