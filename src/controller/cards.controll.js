const db = require("../config.mongodb");
const { ObjectId } = require("mongodb");
const response = require("../services/response.service");
const product = db.collection("product");

class CardsControll {
  /* ADD NEW CARD */
  async addCard(req, res) {
    try {
      const data = req.body;

      await product.updateOne(data, { $set: data }, { upsert: true }); // I have used updateOne instead of insertOne because it will prevent dublicate insertion but properies uniqueness will not effact
      response.success(res, "Махсулот муофақиятли яратилди", undefined);
    } catch (err) {
      response.internal(res, undefined, err);
    }
  }

  /* EDIT CARD */
  async editCard(req, res) {
    try {
      const data = req.body;
      const id = data._id; // Im first defining id given from mongodb
      delete data._id; // then deleting because mongodb ids are immutable
      const result = await product.updateOne(
        ...[{ _id: new ObjectId(id) }, { $set: data }]
      );
      if (result.modifiedCount === 0) {
        response.notFound(res);
      } else {
        response.success(res, undefined, null);
      }
    } catch (err) {
      response.internal(res, undefined, err);
      console.log(err);
    }
  }

  /* DELETE CARD */
  async deleteCard(req, res) {
    try {
      const { _id } = req.body;
      await product.deleteOne({ _id: new ObjectId(_id) });
      response.success(res, undefined, null);
    } catch (err) {
      response.internal(res, undefined, err);
    }
  }

  async getByPaginationAndCategoryCard(req, res) {
    try {
      const category = req.query.category;
      const page = parseInt(req.query.page, 10) || 1;
      const limit = parseInt(req.query.limit, 10) || 10;
      const skip = (page - 1) * limit;

      const query = category ? { category } : {};

      const items = await product.find(query).skip(skip).limit(limit).toArray();

      const count = await product.countDocuments(query);

      const totalPages = Math.ceil(count / limit);

      response.success(res, undefined, {
        page,
        limit,
        totalPages,
        count,
        items,
      });
    } catch (err) {
      response.internal(res, undefined, err);
    }
  }

  async getAllCard(req, res) {
    try {
      const data = await product.find().toArray();
      response.success(res, undefined, { data });
    } catch (err) {
      response.internal(res, undefined, err);
    }
  }

  async getSingleCard(req, res) {
    try {
      const { id } = req.params;
      const data = await product.findOne({ _id: new ObjectId(id) });
      if (data === null) {
        response.notFound(res);
      }
      response.success(res, undefined, data);
    } catch (err) {
      console.log(err);
      response.internal(res, undefined, err);
    }
  }
}

module.exports = new CardsControll();
