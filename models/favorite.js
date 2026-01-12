const { getDB } = require("../utils/databaseUtil");

module.exports = class Favorite {
  constructor(houseId) {
    this.houseId = houseId;
  }

  save() {
    const db = getDB();
    return db.collection("favorites").insertOne(this);
  }

  static getFavorites() {
    const db = getDB();
    return db.collection("favorites").find().toArray();
  }
  static deleteById(delHomeId) {
    const db = getDB();
    return db.collection("favorites").deleteOne({ houseId: delHomeId });
  }
};
