const express = require("express");
const storeRouter = express.Router();
const {
  getHomes,
  getBooking,
  getFavoriteList,
  getIndex,
  getHomeDetails,
  postAddToFavorite,
  postRemoveFromFavorite,
} = require("../controllers/storeController");

storeRouter.get("/", getIndex);
storeRouter.get("/bookings", getBooking);
storeRouter.get("/favorite-list", getFavoriteList);
storeRouter.get("/homes", getHomes);
storeRouter.get("/homes/:homeId", getHomeDetails);
storeRouter.post("/favorite-list", postAddToFavorite);
storeRouter.post("/favorites/delete/:homeId", postRemoveFromFavorite);
module.exports = storeRouter;
