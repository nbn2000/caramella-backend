const db = require("../config.mongodb");
const { ObjectId } = require("mongodb");
const response = require("../services/response.service");

const product = db.collection("product");
const cart = db.collection("cart");

class OrderControll {
  /* GET ORDERS */
  async getOrder(req, res) {
    try {
      const data = req.body;
      response.success(res, "Махсулот муофақиятли яратилди", undefined);
    } catch (err) {
      response.internal(res, undefined, err);
    }
  }
}

module.exports = new OrderControll();
