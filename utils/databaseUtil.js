const mongo = require("mongodb");
const MongoClient = mongo.MongoClient;

const MONGO_URL =
  "mongodb+srv://shubham:223221@loserdev.4mu1yt0.mongodb.net/?appName=loserdev";
let _db;
const MongoConnect = (callback) => {
  MongoClient.connect(MONGO_URL)
    .then((client) => {
      callback();
      _db = client.db("airbnb");
    })
    .catch((err) => {
      console.log("Error while connecting Mongo", err);
    });
};

const getDB = () => {
  if (!_db) {
    throw new Error("Mongo Not Connected");
  }
  return _db;
};
exports.MongoConnect = MongoConnect;
exports.getDB = getDB;
