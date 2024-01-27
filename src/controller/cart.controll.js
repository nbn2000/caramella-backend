const db = require("../config.mongodb");
const { ObjectId } = require("mongodb");
const response = require("../services/response.service");

const product = db.collection("product");
const cart = db.collection("cart");

class CartControll {
  /* ADD TO CART */
  async addToCart(req, res) {
    try {
      const data = req.body;
      const amount = data?.amount === 0 ? 1 : data?.amount;
      const card = await product.findOne({
        _id: new ObjectId(data?.product_id),
      });
      card.amount = amount;
      const totalPrice = Number(card.price) * amount;
      const searchResult = await cart.findOne({ device_id: data?.device_id });
      if (searchResult === null) {
        const obj = {
          device_id: data?.device_id,
          user: data?.user,
          total_price: totalPrice,
          cart: [card],
        };
        await cart.insertOne(obj);
      } else {
        const id = searchResult?._id;
        delete searchResult?._id;
        const newObj = {
          device_id: searchResult?.device_id,
          user: data?.user,
          total_price: searchResult?.total_price + totalPrice,
          cart: [...searchResult.cart, card],
        };
        await cart.updateOne(...[{ _id: new ObjectId(id) }, { $set: newObj }]);
      }
      response.success(res, "Махсулот муофақиятли яратилди", undefined);
    } catch (err) {
      response.internal(res, undefined, err);
    }
  }

  /* GET SELECTED CART*/
  async getCart(req, res) {
    try {
      const { device_id } = req.params;
      const searchResult = await cart.findOne({ device_id: String(device_id) });
      if (!searchResult) {
        response.notFound(res, "Махсулот топилмади", undefined);
        return;
      }
      response.success(res, "Махсулот муофақиятли яратилди", searchResult);
    } catch (err) {
      response.internal(res, undefined, err);
      console.log(err);
    }
  }
  /* CHANGE CART AMOUNT*/
  async changeCartAmount(req, res) {
    try {
      const { device_id, product_id, amount } = req?.body;
      const filter = {
        device_id: device_id,
        "cart._id": new ObjectId(product_id),
      };
      const update = {
        $set: { "cart.$.amount": amount },
      };
      const result = await cart.updateOne(filter, update);

      if (result.matchedCount === 0) {
        response.notFound(res);
      }

      const doc = await cart.findOne({ device_id });

      const total_price = doc.cart.reduce((total, item) => {
        return total + item.amount * parseFloat(item.price);
      }, 0);
      await cart.updateOne({ device_id }, { $set: { total_price } });

      response.success(res, "Махсулот муофақиятли яратилди");
    } catch (err) {
      console.log(err);
      response.internal(res, undefined, err);
    }
  }

  /* DELETE CART ITEM*/
  async deleteCartItem(req, res) {
    try {
      const data = req?.body;
      const newCart = await cart.findOne({ device_id: data?.device_id });
      const id = newCart._id;
      delete newCart._id;
      const card = newCart?.cart?.filter(
        (i) => i._id.toString() !== data?.product_id
      );
      if (
        newCart?.cart.length === 1 &&
        newCart?.cart[0]?._id.toString() === data?.product_id
      ) {
        await cart.deleteOne({ device_id: data?.device_id });
        response.success(res, "success");
      } else {
        newCart.cart = card;
        await cart.updateOne(...[{ _id: new ObjectId(id) }, { $set: newCart }]);
        const result = await cart.findOne({ device_id: data?.device_id });
        response.success(res, "success", result);
      }
    } catch (err) {
      console.log(err);
      response.internal(res, undefined, err);
    }
  }
}

module.exports = new CartControll();
