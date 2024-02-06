const db = require("../config.mongodb");
const response = require("../services/response.service");
const { ObjectId } = require("mongodb");

const telegram_bot_token = db.collection("telegram_bot_token");
const user = db.collection("users");
const admin = db.collection("admin");
const device = db.collection("device");
const crypto = require("crypto");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

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
        response.success(res, "Сиз рўйхатдан ўтдингиз, табриклаймиз", userInfo);
      } else {
        response.notFound(res, "Парол нотўғри, қайта уриниб кўринг");
      }
    } catch (err) {
      console.log(err);
      response.internal(res, err);
    }
  }

  /* ADMIN LOGIN */
  async adminSignin(req, res) {
    try {
      const { login, password } = req.body;
      const result = await admin.findOne({ login });
      if (login !== null) {
        const passwordMatch = await bcrypt.compare(password, result?.password);
        if (passwordMatch) {
          const token = jwt.sign(
            { ...result },
            process.env.SECRET_KEY || "5555"
          );
          return response.success(res, undefined, { token });
        } else {
          return response.notFound(res, "парол нотўғри киритилди");
        }
      } else {
        return response.notFound(res, "Логин нотўғри киритилди");
      }
    } catch (err) {
      console.log(err);
      response.internal(res, undefined, err);
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
      console.log(err);
      response.internal(res, undefined, err?.message);
    }
  }

  /* SINGUP DEVICE */

  async singupDevice(req, res) {
    try {
      const device_id = crypto.randomBytes(12).toString("hex");
      await device.insertOne({ device_id });
      const token = jwt.sign({ device_id }, process.env.SECRET_KEY);
      response.success(res, undefined, {
        device_id: JSON.stringify(device_id),
        token,
      });
    } catch (err) {
      console.log(err);
      response.internal(res, undefined, err);
    }
  }
}

module.exports = new userControll();
