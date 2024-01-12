const { MongoClient, ServerApiVersion } = require("mongodb");
const uri = process.env.MONGODBURI;

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
