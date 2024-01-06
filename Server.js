const express = require("express");
const app = express();
require("dotenv").config();
const cors = require("cors");
const port = process.env.PORT || 8080;
const rt = require("./src/Router");
// const auth = require("./src/middlewere/auth");
app.use(cors());
app.use(express.json());
// app.use(express.urlencoded({ extended: false }));
// app.use(auth);
app.use(rt);

app.listen(port, () =>
  console.log(`Server started on http://localhost${port}`)
);

//https://api.telegram.org/bot6936158240:AAEjqwLnzwTMz6RWhxUUBr47kJDQYUUNyvc/setWebhook?url=https://e1d8-213-230-69-2.ngrok-free.app/api/v1/telegram
