const rt = require("express").Router();
const multer = require("multer");

/* Router for user */
const uc = require("./controller/user.controll");
const uv = require("./validation/user.validation");
// const userImg = multer().single("user-img");

rt.post("/api/signup", uc.signup);
// rt.post("/update-user-img/:id", [userImg], uc.updateImg);

//telegram bot
const bot = require("./controller/telegramBot");
rt.post("/api/v1/telegram", bot.registerBot);

module.exports = rt;
