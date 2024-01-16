const rt = require("express").Router();
const validation = require("./validation/validation");

/* USER CONTROLL */
const userControll = require("./controller/user.controll");

rt.post("/api/add/user", userControll.signup);
rt.delete("/api/delete/user", userControll.deleteUser);
rt.get("/api/getall/user", userControll.getAllUser);

/* TELEGRAM BOT CONTROLL */
const bot = require("./controller/telegramBot");

rt.post("/api/v1/telegram", bot.registerBot);

/* FILE CONTROLL */
const multer = require("multer");
const upload = multer({ storage: multer.memoryStorage() });

const fileControll = require("./controller/file.controll");
rt.post("/api/upload/image", upload.single("file"), fileControll.uploadImage);
rt.post("/api/upload/images", upload.array("files"), fileControll.uploadImages);
rt.delete("/api/delete/image", fileControll.deleteImage);
rt.delete("/api/delete/images", fileControll.deleteImages);
rt.post("/api/edit/image", upload.single("file"), fileControll.editImage);
rt.post("/api/edit/images", upload.array("files"), fileControll.editImages);

/* CARDS CONTROLL */
const cardsControll = require("./controller/cards.controll");

rt.post("/api/add/card", [validation.Card], cardsControll.addCard);
rt.put("/api/edit/card", [validation.Card], cardsControll.editCard);
rt.delete("/api/delete/card", cardsControll.deleteCard);
rt.get("/api/pagination/card", cardsControll.getByPaginationAndCategoryCard);
rt.get("/api/getall/card", cardsControll.getAllCard);

/* VACANCY CONTROLL */
const vacancyControll = require("./controller/vacancy.controll");

rt.post("/api/add/vacancy", [validation.Vacancy], vacancyControll.addVacancy);
rt.put("/api/edit/vacancy", [validation.Vacancy], vacancyControll.editVacancy);
rt.delete("/api/delete/vacancy", vacancyControll.deleteVacancy);
rt.get("/api/getall/vacancy", vacancyControll.getAllVacancy);

/* CART CONTROLL */
const cartControll = require("./controller/cart.controll");

rt.post("/api/add/cart", cartControll.addToCart);
rt.post("/api/get/cart", cartControll.getCart);
rt.post("/api/change/cart/amount", cartControll.changeCartAmount);
rt.delete("/api/delete/cart/item", cartControll.deleteCartItem);

/* ORDER CONTROLL */
const orderControll = require("./controller/order.controll");

rt.post("/api/get/order", orderControll.getOrder);
rt.get("/api/get/all-orders", orderControll.getAllOrders);
rt.post("/api/change-checked/order", orderControll.toggleCheckedOrder);
rt.post("/api/change-given/order", orderControll.toggleGivenOrder);

module.exports = rt;
