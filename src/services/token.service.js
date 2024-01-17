const jwt = require("jsonwebtoken");
const key = process.env.SECRET_KEY;

class jwtService {
  async createToken(data) {
    return new Promise(async (resolve, reject) => {
      try {
        const token = await jwt.sign(data, key);
        resolve(token);
      } catch (err) {
        reject(err);
      }
    });
  }

  async verifyToken(token) {
    return new Promise(async (resolve, reject) => {
      try {
        const data = await jwt.verify(token, key);
        resolve(data);
      } catch (err) {
        reject(err);
      }
    });
  }
}

module.exports = new jwtService();
