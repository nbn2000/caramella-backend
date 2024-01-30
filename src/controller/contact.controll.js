const db = require("../config.mongodb");
const response = require("../services/response.service");
const nodemailer = require("nodemailer");
const contacted_people = db.collection("contacted_people");

class ContactControll {
  /* ADD TO CART */
  async sendContact(req, res) {
    try {
      const data = req.body;
      //SEND DATA TO EMAIL
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
        subject: `${data?.name} сизга алоқага чиқди`,
        text: `${data?.description}`,
        html: `<h3><strong>Телефон номери: </strong> <a href="tel:${data?.tel}">${data?.tel}</a></h3> </br> <h4><strong>${data?.name} изохи:</strong> ${data?.description}</h4>`,
      });
      console.log(info);
      await contacted_people.updateOne(data, { $set: data }, { upsert: true });
      response.success(
        res,
        "Сизнинг сўровингиз мувофақиятил жўнатилди",
        undefined
      );
    } catch (err) {
      response.internal(res, undefined, err);
    }
  }
}

module.exports = new ContactControll();
