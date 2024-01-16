const db = require("../config.mongodb");
const { ObjectId } = require("mongodb");
const response = require("../services/response.service");
const nodemailer = require("nodemailer");
const crypto = require("crypto");

const orders = db.collection("orders");

class OrderControll {
  /* GET ORDERS */
  async getOrder(req, res) {
    try {
      const data = await req.body;
      //SEND DATA TO EMAIL
      const names = data?.cart.map((i) => {
        return `${i.name} дан ${i.amount}та`;
      });
      const whomName =
        data?.user?.name === undefined ? "мижоз" : data?.user?.name;
      const whomUsername =
        data?.user?.userName === undefined ? "мижоз" : data?.user?.userName;
      const whomPhoneNumber = data?.user?.phoneNumber;
      const whomAddittionalPhoneNumber =
        data?.additionalPhoneNumber === undefined
          ? ""
          : data?.additionalPhoneNumber;
      const fromWhom = `<h5>исми: ${whomName}</h5> <h5>телегами: <a href="https://t.me/${data?.user?.userName}">@${whomUsername}</a></h5> <h5>тел: <a href="tel:${data?.user?.phoneNumber}">${whomPhoneNumber}</a></h5> <h5>тел2: <a href="tel:${data?.additionalPhoneNumber}">${whomAddittionalPhoneNumber}</a></h5>`;
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
        subject: String(`${names} ${data?.date} ${data?.time} га `),
        text: String(data?.comment),
        html: `<h3>Обший: <strong>${data?.total_price}</strong> бўлади</h3> </br> <div><strong>Қўшимча илтимоси: </strong> <span>${data?.comment}</span></div>  </br><div><h4> Заказ берувчи:</h4>${fromWhom}</div> `,
      });

      console.log(info);

      //INSERT TO MONGODB
      data.orderedDate = new Date().toLocaleString();
      data.orderNumber = crypto.randomBytes(4).toString("hex");
      await orders.insertOne(data);
      response.success(res, "Махсулот муофақиятли яратилди", {
        orderNumber: data?.orderNumber,
      });
    } catch (err) {
      response.internal(res, undefined, err);
      console.log(err);
    }
  }
  /* GET ALL ORDERS TO ADMIN */
  async getAllOrders(req, res) {
    try {
      const data = await orders.find().toArray();
      response.success(res, undefined, { data });
    } catch (err) {
      response.internal(res, undefined, err);
      console.log(err);
    }
  }

  /* TOGGLE CHECKED FROM ORDER */
  async toggleCheckedOrder(req, res) {
    try {
      const { _id } = req.body;
      const order = await orders.findOne({ _id: new ObjectId(_id) });
      if (!order) {
        return response.notFound(res, "Order not found");
      }
      await orders.updateOne(
        { _id: new ObjectId(_id) },
        { $set: { checked: !order.checked } }
      );
      response.success(res);
    } catch (err) {
      response.internal(res, undefined, err);
      console.log(err);
    }
  }

  /* TOGGLE CHECKED FROM ORDER */
  async toggleGivenOrder(req, res) {
    try {
      const { _id } = req.body;
      const order = await orders.findOne({ _id: new ObjectId(_id) });
      if (!order) {
        return response.notFound(res, "Order not found");
      }
      await orders.updateOne(
        { _id: new ObjectId(_id) },
        { $set: { given: !order.given } }
      );
      response.success(res);
    } catch (err) {
      response.internal(res, undefined, err);
      console.log(err);
    }
  }
}

module.exports = new OrderControll();
