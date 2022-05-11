if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}
var express = require("express");
var fetch = require("node-fetch");
var router = express.Router();
/**
  Opdatere profil
  bruger profil kommer fra passport bibliotek og findes i req.user object.
  :? er en optional parameter i URL'en
 */

router.get("/:id?", async (req, res) => {
  if (req.isAuthenticated()) {
    if (req.user.Admin && req.params.id) {
      var response = await fetch(process.env.API + "/user/" + req.params.id);
    } else {
      var response = await fetch(process.env.API + "/user/" + req.user.Id);
    }
    var data = await response.json();
    res.render("profile.ejs", {
      user: data.data,
      posturl: (req.user.Admin && req.params.id) ? "/profile/"+req.params.id : "/profile"  ,
    });
  } else {
    res.redirect("/login");
  }
});

router.post("/:id?", async (req, res) => {
  if (req.isAuthenticated()) {
    const requestOptions = {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: req.body.name,
        email: req.body.email,
      }),
    };
    if (req.user.Admin && req.params.id) {
      var response = await fetch(
        process.env.API + "/user/" + req.params.id,
        requestOptions
      );
    } else {
      var response = await fetch(
        process.env.API + "/user/" + req.user.Id,
        requestOptions
      );
    }
    var data = await response.json();
    res.redirect("/");
  } else {
    res.redirect("/login");
  }
});

//til "/profile/delete" funktionen på min index.js side. først laver jeg en app.get for at hente funktionen
router.get("/:id?/delete", async (req, res) => {
  if (req.isAuthenticated()) {
    const requestOptions = {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    };

    if (req.user.Admin && req.params.id) {
      var response = await fetch(
        process.env.API + "/user/" + req.params.id,
        requestOptions
      );
    } else {
      var response = await fetch(
        process.env.API + "/user/" + req.user.Id,
        requestOptions
      );
    }
    var data = await response.json();
    res.redirect("/");
  } else {
    res.redirect("/login");
  }
});
module.exports = router;
