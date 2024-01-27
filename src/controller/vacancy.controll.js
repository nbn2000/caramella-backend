const db = require("../config.mongodb");
const { ObjectId } = require("mongodb");
const response = require("../services/response.service");
const vacancy = db.collection("vacancy");
const nodemailer = require("nodemailer");
const applied_people = db.collection("applied_people");

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
      console.log(res);
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
      response.success(res);
    } catch (err) {
      response.internal(res, undefined, err);
    }
  }

  /* GET ALL VACANCY */
  async getAllVacancy(req, res) {
    try {
      const data = await vacancy.find().toArray();
      if (data === null) {
        response.notFound(res);
      } else {
        response.success(res, undefined, { data });
      }
    } catch (err) {
      response.internal(res, undefined, err);
    }
  }

  /* GET SINGLE VACANCY */
  async getSingleVacancy(req, res) {
    try {
      const { id } = req.params;
      const data = await vacancy.findOne({ _id: new ObjectId(id) });
      if (data === null) {
        response.notFound(res);
      } else {
        response.success(res, undefined, data);
      }
    } catch (err) {
      console.log(err);
      response.internal(res, undefined, err);
    }
  }

  async appliedVacancy(req, res) {
    try {
      const data = await req.body;
      //SEND DATA TO EMAIL
      const vacancyData = await vacancy.findOne({
        _id: new ObjectId(data.vacancyId),
      });
      if (!vacancyData) {
        return response.notFound(
          res,
          "Кечирасиз бу вакансияга хозирча ишга ололмаймиз"
        );
      }
      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: process.env.LOGINGOOGLEACCOUNT,
          pass: process.env.PASSWORDGOOGLEACCOUNT,
        },
      });
      const info = await transporter.sendMail({
        from: "nbnproduction2100@gmail.com",
        to: "caramella4474@gmail.com",
        subject: String(
          `${data?.fullName} дан ${vacancyData?.vacancyName} ишга топшириш `
        ),
        text: String(data?.description),
        html: `<h1>${data?.fullName}</h1> </br> <h3>Сиздан ${vacancyData?.vacancyName} га ишга олишни сўрамоқда</h3> </br> <h3><strong>Телефон номери: </strong> <a href="tel:${data?.tel}">${data?.tel}</a></h3> </br> <h4><strong>${data?.fullName} хақида:</strong> ${data?.description}</h4>`,
      });
      console.log(info);
      await applied_people.updateOne(data, { $set: data }, { upsert: true });
      response.success(
        res,
        "Бизни танлаганингиздан хурсандмиз, тез орада кўришгунча"
      );
    } catch (err) {
      response.internal(res, undefined, err);
      console.log(err);
    }
  }
}

module.exports = new VacancyControll();
