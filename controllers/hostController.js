const path = require("path");
const rootDir = require("../utils/pathUtil");
const Home = require("../models/home");

exports.getAddHome = (req, res, next) => {
  res.render(path.join(rootDir, "views", "host", "edit-home.ejs"), {
    editing: false,
    home: null,
  });
};

exports.getEditHome = (req, res, next) => {
  const homeId = req.params.homeId;
  const editing = req.query.editing === "true";
  Home.findById(homeId).then((home) => {
    if (!home) {
      console.log("Home not Found for Editing");
      return res.redirect("/host/host-home-list");
    }
    console.log(homeId, editing, home);
    res.render(path.join(rootDir, "views", "host", "edit-home.ejs"), {
      editing: editing,
      homeId: homeId,
      home: home,
    });
  });
};
exports.getHostHomes = (req, res, next) => {
  Home.fetchAll().then((allHouseName) =>
    res.render("host/host-home-list", { allHouseName: allHouseName })
  );
};
exports.postAddHome = (req, res, next) => {
  const { houseName, pricePerNight, location, rating, photo, description } =
    req.body;
  const home = new Home(
    houseName,
    pricePerNight,
    location,
    rating,
    photo,
    description
  );
  home.save().then(() => {
    console.log("Home Saved Successfully");
  });
  res.redirect("/host/host-home-list"); // ✅ Correct redirect URL
};

exports.postEditHome = (req, res, next) => {
  const { id, houseName, pricePerNight, location, rating, photo, description } =
    req.body;
  const home = new Home(
    houseName,
    pricePerNight,
    location,
    rating,
    photo,
    description,
    id
  );
  home.save().then((result) => {
    console.log("Home Updated", result);
  });
  res.redirect("/host/host-home-list");
};

exports.postDeleteHome = (req, res, next) => {
  const homeId = req.params.homeId;
  console.log("Home id ", homeId);
  Home.deleteById(homeId)
    .then(() => {
      res.redirect("/host/host-home-list");
    })
    .catch((error) => {
      console.log("Error while delete", error);
    });
};
