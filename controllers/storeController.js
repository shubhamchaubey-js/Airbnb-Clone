const Favorite = require("../models/favorite");
const Home = require("../models/home");

exports.getHomes = (req, res, next) => {
  Home.find().then((allHouseName) => {
    res.render("store/welcome", { allHouseName: allHouseName });
  });
};
exports.getIndex = (req, res, next) => {
  Home.find()
    .then((allHouseName) => {
      res.render("store/index", { allHouseName: allHouseName });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.getBooking = (req, res, next) => {
  Home.find().then((allHouseName) =>
    res.render("store/bookings", { allHouseName: allHouseName })
  );
};

exports.getFavoriteList = (req, res, next) => {
  Favorite.find()
    .populate("houseId")
    .then((favorites) => {
      const favoriteHomes = favorites.map((fav) => fav.houseId);

      res.render("store/favorite-list", { favoriteHomes: favoriteHomes });
    });
};

exports.postAddToFavorite = (req, res, next) => {
  const homeId = req.body.id;
  Favorite.findOne({ houseId: homeId }).then((fav) => {
    if (fav) {
      console.log("Already Marked As Favorite");
    } else {
      fav = new Favorite({ houseId: homeId });
      fav
        .save()
        .then((result) => {
          console.log("Favorite Added !", result);
        })
        .catch((eeerrr) => {
          console.log("Error while marking Favorite", eeerrr);
        });
    }
    res.redirect("/favorite-list");
  });
};

exports.postRemoveFromFavorite = (req, res, next) => {
  const homeId = req.params.homeId;

  Favorite.findOneAndDelete({ houseId: homeId })
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
  Home.find().then(([allHouseName]) => {
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
