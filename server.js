if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const express = require("express");
const app = express();

const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcrypt");

var db = require("./database");

const flash = require("express-flash");
var bodyParser = require('body-parser')

const session = require("express-session");
const fs = require("fs");
const _ = require("lodash");
const { nanoid } = require("nanoid");
const fileUpload = require("express-fileupload");

var apiRouter = require("./routes/api");
var indexRouter = require("./routes/index");
var profileRouter = require("./routes/profile");
var registerRouter = require("./routes/register");
var adRouter = require("./routes/ad");
var adminRouter = require("./routes/admin");

//sætter min template engine til at være "ejs"
app.set("view-engine", "ejs");

//gør brug af express.urlencoded, flash og session
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json())

app.use(flash());
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
  })
);

//bruger passport.initialize og passport.session til at holde min loginserver kørende og validere brugerens autensitet
/** Passport Setup START **/

passport.use(
  new LocalStrategy(function (username, password, done) {
    db.get(
      "SELECT Password FROM User WHERE Email = ?",
      username,
      function (err, row) {
        if (!row) return done(null, false);
        db.get(
          "SELECT Email, Id FROM User WHERE Email = ? AND Password = ?",
          username,
          password,
          function (err, row) {
            if (!row) return done(null, false);
            return done(null, row);
          }
        );
      }
    );
  })
);

passport.serializeUser(function (user, done) {
  return done(null, user.Id);
});

passport.deserializeUser(function (id, done) {
  db.get(
    "SELECT Id, Name, Email, Admin,Gold FROM User WHERE Id = ?",
    id,
    function (err, row) {
      if (!row) return done(null, false);
      return done(null, row);
    }
  );
});
app.use(passport.initialize());
app.use(passport.session());

/** Passport Setup END **/

app.use(express.static("assets"));

app.use("/uploads", express.static("uploads"));
app.use(fileUpload());

app.use("/api", apiRouter);
app.use("/", indexRouter);
app.use("/profile", profileRouter);
app.use("/register", registerRouter);
app.use("/ad", adRouter);
app.use("/admin", adminRouter);
/** Login */

app.get("/login", (req, res) => {
  res.render("login.ejs");
});
app.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/login",
    failureFlash: true,
  })
);

/** Logout */
app.get("/logout", (req, res) => {
  req.session.destroy();
  req.logout();
  res.redirect("/");
});

//Her er porten hvorpå min localhost lytter, altså port 3010
app.listen(3010);

module.exports = app