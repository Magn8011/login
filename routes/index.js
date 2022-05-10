if (process.env.NODE_ENV !== "production") {
    require("dotenv").config();
  }
  //hent forskellige biblioteker, og angiv dem som variabler 
  var express = require('express');
  var fetch = require('node-fetch');
  var router = express.Router();
  
  //hvilke response 
  router.get("/", async (req, res) => {
    if (req.isAuthenticated()) {
      var response = await fetch(process.env.API + '/user/'+req.user.Id+'/ads');
    } else {
      var response = await fetch(process.env.API + '/announcements');
    }
    const AdsData = await response.json();
    var response = await fetch(process.env.API + '/categories');
    const CategoryData = await response.json();
    res.render("index.ejs", {
  //angiver produktdata og categorylist
      Ads: AdsData.data,
      categories: CategoryData.data,
      auth: req.isAuthenticated(),
    });
  });
  
  module.exports = router;