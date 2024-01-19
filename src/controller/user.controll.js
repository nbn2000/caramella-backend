const db = require("../config.mongodb");
const response = require("../services/response.service");
const { ObjectId } = require("mongodb");

const telegram_bot_token = db.collection("telegram_bot_token");
const user = db.collection("users");
const admin = db.collection("admin");

class userControll {
  /* ADD NEW USER */
  async signup(req, res) {
    try {
      const { passCode } = req?.body;
      const checkPassCode = await telegram_bot_token.findOne({ passCode });
      if (checkPassCode !== null) {
        const userNameFromPassCode = checkPassCode?.userName;
        const userInfo = await user.findOne({
          userName: userNameFromPassCode,
        });
        response.success(res, "You passed from register congrats", userInfo);
      } else {
        response.notFound(res, "Passcode is incorrect please try again");
      }
    } catch (err) {
      response.internal(res, err);
    }
  }

  /* ADMIN LOGIN */
  async adminSignin(req, res) {
    try {
      const data = req.body;
      const login = await admin.findOne({ login: data.login });
      if (login.password === data.password) {
        response.success(res, undefined, {
          token: "r9283ry9fhssod9ufhs9daf8u0a98suf098u43",
        });
      } else {
        response.notFound(res);
      }
    } catch (err) {
      response.internal(res, undefined, err);
      console.log(err);
    }
  }

  /* DELETE USER */
  async deleteUser(req, res) {
    try {
      const { _id } = req.body;
      await user.deleteOne({ _id: new ObjectId(_id) });
      response.success(res, "Фойдаланувчи мувофақиятли ўчирилди");
    } catch (err) {
      response.internal(res, err);
    }
  }
  /* GET ALL USERS */
  async getAllUser(req, res) {
    try {
      const data = await user.find().toArray();
      response.success(res, undefined, { data });
    } catch (err) {
      response.internal(res, undefined, err);
    }
  }
}

module.exports = new userControll();
