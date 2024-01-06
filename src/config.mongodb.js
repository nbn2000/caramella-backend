const { MongoClient, ServerApiVersion } = require("mongodb");
const username = process.env.MONGODBUSERNAME;
const password = process.env.MONGODBPASSWORD;
const uri = `mongodb+srv://${username}:${password}@caramella.i9b4jre.mongodb.net/?retryWrites=true&w=majority`;

const config = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

(async () => {
  try {
    await config.connect();
    console.log("MongoDB connected!");
  } catch (err) {
    console.log("There is error with connecting");
    console.log(
      "================================================================"
    );
    console.log(err);
    console.log(
      "================================================================"
    );
  }
})();

const db = config.db("Caramella");
module.exports = db;
