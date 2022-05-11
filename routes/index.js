if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}
var express = require('express');
var fetch = require('node-fetch');
var router = express.Router();

router.get("/follow", async (req, res) => {
  if (req.isAuthenticated()) {
    var response = await fetch(process.env.API + '/user/'+req.user.Id+'/follow');
    const AdsData = await response.json();
    var response = await fetch(process.env.API + '/categories');
    const CategoryData = await response.json();
    res.render("index.ejs", {
      //angiver productdata og categorylist
      Ads: AdsData.data,
      categories: CategoryData.data,
      auth: req.isAuthenticated(),
      all: true,
      admin: req.isAuthenticated() && req.user.Admin == 1 ? true: false,
      url: "/follow",
    });
  } else {
    res.redirect("/");  
  } 
});
router.get("/myads", async (req, res) => {
  if (req.isAuthenticated()) {
    var response = await fetch(process.env.API + '/user/'+req.user.Id+'/ads');
    const AdsData = await response.json();
    var response = await fetch(process.env.API + '/categories');
    const CategoryData = await response.json();
    res.render("index.ejs", {
      //angiver productdata og categorylist
      Ads: AdsData.data,
      categories: CategoryData.data,
      auth: req.isAuthenticated(),
      all: false,
      admin: req.isAuthenticated() && req.user.Admin == 1 ? true: false,
      url: "/myads",
    });
  } else {
    res.redirect("/");  
  } 
});

router.get("/", async (req, res) => {
  if (req.isAuthenticated()) {
    var response = await fetch(process.env.API + '/announcements/' + req.user.Id);
  } else {
    var response = await fetch(process.env.API + '/announcements');
  }
  const AdsData = await response.json();

  var response = await fetch(process.env.API + '/categories');
  const CategoryData = await response.json(); 
  res.render("index.ejs", {
    //angiver productdata og categorylist
    Ads: AdsData.data,
    categories: CategoryData.data,
    auth: req.isAuthenticated(),
    all: true,
    admin: req.isAuthenticated() && req.user.Admin == 1 ? true: false,
    url: "/",
  });
});

module.exports = router;