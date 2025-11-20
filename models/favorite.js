const path = require("path");
const rootDir = require("../utils/pathUtil");
const fs = require("fs");

const favoriteFilePath = path.join(rootDir, "data", "favorite.json");
module.exports = class Favorite {
  static addToFavorite(HomeId, callback) {
    Favorite.getFavorites((favorite) => {
      if (favorite.includes(HomeId)) {
        callback("Home is already Marked Favorite");
      } else {
        favorite.push(HomeId);
        fs.writeFile(favoriteFilePath, JSON.stringify(favorite), (errr) => {
          console.log("Error is ", errr);
        });
      }
    });
  }

  static getFavorites(callback) {
    fs.readFile(favoriteFilePath, (errr, data) => {
      if (!errr) {
        callback(JSON.parse(data));
      } else {
        callback([]);
      }
    });
  }
  static deleteById(delHomeId, callback) {
    Favorite.getFavorites((homeIds) => {
      homeIds = homeIds.filter((homeId) => homeId !== delHomeId);

      fs.writeFile(favoriteFilePath, JSON.stringify(homeIds), callback);
    });
  }
};
