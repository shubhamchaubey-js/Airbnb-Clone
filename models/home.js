const mongoose = require("mongoose");
const favorite = require("./favorite");
/**
 * save()
 * find()
 *  findById(homeId)
 * deleteById(homeId)
 * deleteById(homeId)
 */

const homeSchema = mongoose.Schema({
  houseName: { type: String, required: true },
  pricePerNight: { type: Number, required: true },
  location: { type: String, required: true },
  rating: { type: Number, required: true },
  photo: { type: String },
  description: { type: String },
});

homeSchema.pre("findOneAndDelete", async function (next) {
  const homeId = this.getQuery()["_id"];
  await favorite.deleteMany({ houseId: homeId });
  next();
});
module.exports = mongoose.model("Home", homeSchema);
