const db = require("../config.mongodb");
const { ObjectId } = require("mongodb");
const response = require("../services/response.service");
const vacancy = db.collection("vacancy");

class VacancyControll {
  /* ADD NEW VACANCY */
  async addVacancy(req, res) {
    try {
      const data = req.body;

      await vacancy.updateOne(data, { $set: data }, { upsert: true }); // I have used updateOne instead of insertOne because it will prevent dublicate insertion but properies uniqueness will not effact
      response.success(res, "Махсулот муофақиятли яратилди", undefined);
    } catch (err) {
      response.internal(res, undefined, err);
    }
  }

  /* EDIT VACANCY */
  async editVacancy(req, res) {
    try {
      const data = req.body;
      const id = data._id; // Im first defining id given from mongodb
      delete data._id; // then deleting because mongodb ids are immutable
      await vacancy.updateOne(...[{ _id: new ObjectId(id) }, { $set: data }]);
      response.success(res, undefined, null);
    } catch (err) {
      response.internal(res, undefined, err);
    }
  }

  /* DELETE VACANCY */
  async deleteVacancy(req, res) {
    try {
      const { _id } = req.body;
      await vacancy.deleteOne({ _id: new ObjectId(_id) });
      response.success(res, undefined, null);
    } catch (err) {
      response.internal(res, undefined, err);
    }
  }

  /* GET ALL VACANCY */
  async getAllVacancy(req, res) {
    try {
      const data = await vacancy.find().toArray();
      response.success(res, undefined, { data });
    } catch (err) {
      response.internal(res, undefined, err);
    }
  }
}

module.exports = new VacancyControll();
