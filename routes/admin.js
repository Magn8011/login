if (process.env.NODE_ENV !== "production") {
    require("dotenv").config();
  }
  var express = require("express");
  var fetch = require("node-fetch");
  var router = express.Router();
  
  router.get("/", async (req, res) => {
    if (req.isAuthenticated() && req.user.Admin == 1) {
      var response = await fetch(process.env.API + "/users");
      const UsersData = await response.json();
  
      var response = await fetch(process.env.API + "/stat");
      const StatData = await response.json();
  
      res.render("admin.ejs", {
        users: UsersData.data,
        stat: StatData.data,
        auth: req.isAuthenticated(),
      });
    } else {
      res.redirect("/");
    }
  });
  
  router.get("/:id/admin", async (req, res) => {
    if (req.isAuthenticated() && req.user.Admin == 1) {
      const requestOptions = {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
      };
      const response = await fetch(
        process.env.API + "/user/" + req.params.id + "/admin",
        requestOptions
      );
      const data = await response.json();
      res.redirect("/admin");
    } else {
      res.redirect("/login");
    }
  });
  
  router.get("/:id/gold", async (req, res) => {
    if (req.isAuthenticated() && req.user.Admin == 1) {
      const requestOptions = {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
      };
      const response = await fetch(
        process.env.API + "/user/" + req.params.id + "/gold",
        requestOptions
      );
      const data = await response.json();
      res.redirect("/admin");
    } else {
      res.redirect("/login");
    }
  });
  
  module.exports = router;
  