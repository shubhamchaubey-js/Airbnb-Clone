const express = require("express");
const path = require("path");
const storeRouter = require("./routes/storeRouter");
const { hostRouter } = require("./routes/hostRouter");
const rootDir = require("./utils/pathUtil");
const { err } = require("./controllers/err");
const { default: mongoose } = require("mongoose");
const app = express();

app.set("view engine", "ejs");
app.set("views", "views");
app.use(express.urlencoded({ extended: false }));
app.use(storeRouter); // Route for "/"
app.use("/host", hostRouter); // Route for "/host"
app.use(express.static(path.join(rootDir, "public"))); // Serving static files

app.use(err);

const PORT = 4000;

const DB_PATH =
  "mongodb+srv://shubham:223221@loserdev.4mu1yt0.mongodb.net/airbnb?appName=loserdev";
mongoose
  .connect(DB_PATH)

  .then(() => {
    console.log("Connected to Mongoose");
    app.listen(PORT, () => {
      console.log(`Server Running on http://localhost:${PORT}`);
    });
  })
  .catch((errr) => {
    console.log("Error while connecting to Mongoose", errr);
  });
