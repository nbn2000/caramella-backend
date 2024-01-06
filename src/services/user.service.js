const crypto = require("crypto");
const mysqlService = require("./mysql.service");
const sharp = require("sharp");
const path = require("path");
const tokenService = require("./token.service");

class userService {
  // post /signup - public
  async signup(data) {
    return new Promise(async (res, rej) => {
      try {
        data.id = crypto.randomBytes(4).toString("hex");
        const sql = `INSERT INTO user SET ?`;
        try {
          await mysqlService.query(sql, data);
          res(null);
        } catch (err) {
          return res(err);
        }
      } catch (error) {
        rej(error);
      }
    });
  }
  //post /signin - public
  async signin({ username, password }) {
    return new Promise(async (resolve, reject) => {
      try {
        const sql = `SELECT * FROM user WHERE password = ? AND username = ?`;
        const result = await mysqlService.query(sql, [password, username]);
        if (!result) return resolve(null);
        resolve(result[0]);
      } catch (error) {
        reject(error);
      }
    });
  }
  // POST /update-user-img/:id (Private) - Update user image
  async updateImg(req, id, file) {
    return new Promise(async (resolve, reject) => {
      try {
        const unique = crypto.randomBytes(4).toString("hex");
        const format = file.originalname.split(".").pop();
        const imgName = `user_${unique}.${format}`;
        const to = path.join(__dirname, `../UserImages/${imgName}`);
        const img = `http://${req.headers.host}/img/${imgName}`;
        await sharp(file.buffer).resize(300, 300).toFile(to);

        const sql = "UPDATE user SET img = ? WHERE id = ?";
        await mysqlService.query(sql, [img, id]);

        resolve(img);
      } catch (err) {
        reject(err);
      }
    });
  }
}

module.exports = new userService();
