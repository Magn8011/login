if (process.env.NODE_ENV !== "production") {
    require("dotenv").config();
  }
  var express = require("express");
  var fetch = require("node-fetch");
  var router = express.Router();
  
/*
    Opdatere profil
    brugerprofilerne kommer fra passport-biblioteket og findes i req.user objektet.
    "profile.js" tilhører routes og er derfor en del af klienten.
    sidst kunne vi bare kalde dataen fra de flade jsonfiler, nu skal den fetche dataen via apikald
    hertil hvordan man bliver renderet til enten profile eller login siderne.
*/

  router.get("/", async (req, res) => {
    if (req.isAuthenticated()) {
      const response = await fetch(process.env.API + "/user/" + req.user.Id);
      const data = await response.json();
      res.render("profile.ejs", {
        user: data.data,
        posturl: "/profile",
      });
    } else {
      res.redirect("/login");
    }
  });
  
  //her angives der at den data der vises når man er logget ind, er ens egen data, altså ens egne ads/ announcements
  router.post("/", async (req, res) => {
    if (req.isAuthenticated()) {
      const requestOptions = {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: req.body.name,
          email: req.body.email,
        }),
      };
      const response = await fetch(process.env.API + "/user/" + req.user.Id,requestOptions);
      const data = await response.json();
      res.redirect("/");
    } else {
      res.redirect("/login");
    }
  });
  
  
  //til "/profile/delete" funktionen på min index.js side. først laver jeg en app.get for at hente funktionen
  router.get("/delete", async (req, res) => {
    if (req.isAuthenticated()) {
      const requestOptions = {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      };
      const response = await fetch(process.env.API + "/user/" + req.user.Id,requestOptions);
      const data = await response.json();
      res.redirect("/");
    } else {
      res.redirect("/login");
    }
  });
  module.exports = router;
  