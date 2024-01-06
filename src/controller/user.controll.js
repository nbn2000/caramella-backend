const db = require("../config.mongodb");
const response = require("../services/response.service");

const telegram_bot_token = db.collection("telegram_bot_token");
const usersCollection = db.collection("users");

class userControll {
  async signup(req, res) {
    try {
      const passCode = req?.body?.passCode;
      console.log(passCode);
      const checkPassCode = await telegram_bot_token.findOne({ passCode });
      if (checkPassCode !== null) {
        const userNameFromPassCode = checkPassCode?.userName;
        const userInfo = await usersCollection.findOne({
          userName: userNameFromPassCode,
        });
        const { name, phoneNumber, userName } = userInfo;
        response.success(res, "You passed from register congrats", {
          name,
          phoneNumber,
          userName,
        });
      } else {
        response.notFound(res, "Passcode is incorrect please try again");
      }
    } catch (err) {
      response.internal(res, err);
    }
  }
}

module.exports = new userControll();
