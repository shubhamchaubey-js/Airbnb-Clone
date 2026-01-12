const Favorite = require("../models/favorite");
const Home = require("../models/home");

exports.getHomes = (req, res, next) => {
  Home.fetchAll().then((allHouseName) => {
    res.render("store/welcome", { allHouseName: allHouseName });
  });
};
exports.getIndex = (req, res, next) => {
  Home.fetchAll()
    .then((allHouseName) => {
      res.render("store/index", { allHouseName: allHouseName });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.getBooking = (req, res, next) => {
  Home.fetchAll().then((allHouseName) =>
    res.render("store/bookings", { allHouseName: allHouseName })
  );
};

exports.getFavoriteList = (req, res, next) => {
  Favorite.getFavorites().then((favorites) => {
    favorites = favorites.map((fav) => fav.houseId);
    Home.fetchAll().then((allHouseName) => {
      const favoriteHomes = allHouseName.filter((home) =>
        favorites.includes(home._id.toString())
      );
      res.render("store/favorite-list", { favoriteHomes: favoriteHomes });
    });
  });
};

exports.postAddToFavorite = (req, res, next) => {
  const homeId = req.body.id;
  const fav = new Favorite(homeId);

  fav
    .save()
    .then(() => {
      console.log("Favorite added successfully");
      res.redirect("/favorite-list");
    })
    .catch((err) => {
      console.log("Error while adding to favorite", err);
      res.redirect("/homes");
    });
};

exports.postRemoveFromFavorite = (req, res, next) => {
  const homeId = req.params.homeId;

  Favorite.deleteById(homeId)
    .then(() => {
      console.log("Favorite removed successfully");
      res.redirect("/favorite-list");
    })
    .catch((err) => {
      console.log("Error while removing from favorite", err);
      res.redirect("/homes");
    });
};

exports.getHomeDetails = (req, res, next) => {
  Home.fetchAll().then(([allHouseName]) => {
    const homeId = req.params.homeId;
    console.log("At home details Page", homeId);
    Home.findById(homeId).then((home) => {
      if (!home) {
        console.log("Home Not found");
        res.redirect("/homes");
      } else {
        console.log("home Details Found", home);
        res.render("store/home-details", {
          home: home,
          allHouseName: allHouseName,
        });
      }
    });
  });
};
