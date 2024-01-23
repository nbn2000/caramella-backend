const express = require("express");
const app = express();
require("dotenv").config();
const cors = require("cors");
const port = process.env.PORT || 8080;
const rt = require("./src/Router");
// const auth = require("./src/middlewere/auth");

app.use(cors());
app.use(express.json());
// app.use(auth);
app.use(rt);

app.get("/", async (req, res) => {
  res.send("Wrong website please check again");
});

app.listen(port, () =>
  console.log(`Server started on http://localhost${port}`)
);
