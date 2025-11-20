const Favorite = require("../models/favorite");
const Home = require("../models/home");

exports.getHomes = (req, res, next) => {
  Home.fetchAll().then(([allHouseName]) => {
    res.render("store/welcome", { allHouseName: allHouseName });
  });
};
exports.getIndex = (req, res, next) => {
  Home.fetchAll()
    .then(([allHouseName, fields]) => {
      res.render("store/index", { allHouseName: allHouseName });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.getBooking = (req, res, next) => {
  Home.fetchAll().then(([allHouseName]) =>
    res.render("store/bookings", { allHouseName: allHouseName })
  );
};

exports.getFavoriteList = (req, res, next) => {
  Favorite.getFavorites((favorites) => {
    Home.fetchAll().then(([allHouseName]) => {
      const favoriteHomes = allHouseName.filter((home) =>
        favorites.includes(home.id)
      );
      res.render("store/favorite-list", { favoriteHomes: favoriteHomes });
    });
  });
};

exports.postAddToFavorite = (req, res, next) => {
  Home.fetchAll().then(([allHouseName]) => {
    console.log("Came to add to Favorite", req.body);
    Favorite.addToFavorite(req.body.id, (error) => {
      if (error) {
        console.log("Add to Favorite Error", error);
      }
      res.redirect("/favorite-list");
    });
  });
};

exports.postRemoveFromFavorite = (req, res, next) => {
  const homeId = req.params.homeId;
  Favorite.deleteById(homeId, (error) => {
    if (error) {
      console.log("Error While Removing From Favorite", error);
    }
    res.redirect("/favorite-list");
  });
};

exports.getHomeDetails = (req, res, next) => {
  Home.fetchAll().then(([allHouseName]) => {
    const homeId = req.params.homeId;
    console.log("At home details Page", homeId);
    Home.findById(homeId).then(([homes]) => {
      const home = homes[0];
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
