const rt = require("express").Router();
const validation = require("./validation/validation");
const { auth } = require("./middlewere/auth");

/* USER CONTROLL */
const userControll = require("./controller/user.controll");

rt.post("/api/add/user", auth, userControll.signup);
rt.delete("/api/delete/user", auth, userControll.deleteUser);
rt.get("/api/getall/user", auth, userControll.getAllUser);
rt.post("/api/admin/login", userControll.adminSignin);
rt.get("/api/singup/device", userControll.singupDevice);

/* TELEGRAM BOT CONTROLL */
const bot = require("./controller/telegramBot");

rt.post("/api/v1/telegram", bot.registerBot);

/* FILE CONTROLL */
const multer = require("multer");
const upload = multer({ storage: multer.memoryStorage() });

const fileControll = require("./controller/file.controll");
rt.post(
  "/api/upload/image",
  auth,
  upload.single("file"),
  fileControll.uploadImage
);
rt.post(
  "/api/upload/images",
  auth,
  upload.array("files"),
  fileControll.uploadImages
);
rt.delete("/api/delete/image", auth, fileControll.deleteImage);
rt.delete("/api/delete/images", auth, fileControll.deleteImages);
rt.post("/api/edit/image", auth, upload.single("file"), fileControll.editImage);
rt.post(
  "/api/edit/images",
  auth,
  upload.array("files"),
  fileControll.editImages
);

/* CARDS CONTROLL */
const cardsControll = require("./controller/cards.controll");

rt.post("/api/add/card", auth, [validation.Card], cardsControll.addCard);
rt.put("/api/edit/card", auth, [validation.Card], cardsControll.editCard);
rt.delete("/api/delete/card", auth, cardsControll.deleteCard);
rt.get(
  "/api/pagination/card",
  auth,
  cardsControll.getByPaginationAndCategoryCard
);
rt.get("/api/getall/card", auth, cardsControll.getAllCard);
rt.get("/api/getsingle/card/:id", auth, cardsControll.getSingleCard);
rt.get("/api/getnew/card/3", auth, cardsControll.getNewCardThree);

/* VACANCY CONTROLL */
const vacancyControll = require("./controller/vacancy.controll");

rt.post(
  "/api/add/vacancy",
  auth,
  [validation.Vacancy],
  vacancyControll.addVacancy
);
rt.put(
  "/api/edit/vacancy",
  auth,
  [validation.Vacancy],
  vacancyControll.editVacancy
);
rt.delete("/api/delete/vacancy", auth, vacancyControll.deleteVacancy);
rt.get("/api/getall/vacancy", auth, vacancyControll.getAllVacancy);
rt.get("/api/getsingle/vacancy/:id", auth, vacancyControll.getSingleVacancy);
rt.post("/api/applied/vacancy", auth, vacancyControll.appliedVacancy);

/* CART CONTROLL */
const cartControll = require("./controller/cart.controll");

rt.post("/api/add/cart", auth, cartControll.addToCart);
rt.get("/api/get/cart/:device_id", auth, cartControll.getCart);
rt.patch("/api/change/cart/amount", auth, cartControll.changeCartAmount);
rt.delete("/api/delete/cart/item", auth, cartControll.deleteCartItem);
rt.get("/api/check/item", auth, cartControll.checkItem);

/* ORDER CONTROLL */
const orderControll = require("./controller/order.controll");

rt.post("/api/get/order", auth, orderControll.getOrder);
rt.get("/api/get/all-orders/:given", auth, orderControll.getAllOrders);
rt.put("/api/change-checked/order", auth, orderControll.toggleCheckedOrder);
rt.put("/api/change-given/order", auth, orderControll.toggleGivenOrder);
rt.get("/api/get/single-order/:id", auth, orderControll.getSingleOrder);

/* SEND CONTACT TO ADMIN */

const contactControll = require("./controller/contact.controll");

rt.post("/api/send/contact", auth, contactControll.sendContact);

module.exports = rt;
