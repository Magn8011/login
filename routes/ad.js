if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}
var express = require("express");
var fetch = require("node-fetch");
var router = express.Router();


router.get("/:id/unfollow", async (req, res) => {
  if (req.isAuthenticated()) {
    const requestOptions = {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    };
    const response = await fetch(process.env.API + "/ad/" + req.params.id + "/follower/" + req.user.Id,requestOptions);
    const data = await response.json();
    res.redirect("/");
  } else {
    res.redirect("/login");
  }
});

router.get("/:id/follow", async (req, res) => {
  if (req.isAuthenticated()) {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
    };    
    const response = await fetch(process.env.API + "/ad/" + req.params.id + "/follower/" + req.user.Id,requestOptions);
    const data = await response.json();
    res.redirect("/");
  } else {
    res.redirect("/login");
  }
});

  router.get("/new", (req, res) => {
    if (req.isAuthenticated()) {
      res.render("ad.ejs", {
        posturl: "/ad/new",
        ad: {
          name: "",
          price: "",
          category: "",
        },
      });
    } else {
      res.redirect("/login");
    }
  });


  router.post("/new", async (req, res) => {
    if (req.isAuthenticated()) {
      try {
        let uploadpath = "";
        if (req.files) {
          uploadpath = `/uploads/${req.files.image.name}`;
          req.files.image.mv("." + uploadpath, (err) => {
            if (err) console.log(err);
          });
        }

        const requestOptions = {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            title: req.body.title,
            price: req.body.price,
            category: req.body.category,
            image: uploadpath,
            user: req.user.Id,
          }),
        };
        const response = await fetch(process.env.API + "/ad",requestOptions);
        const data = await response.json();

        res.redirect("/");
      } catch (err) {
        // giver en error og sender dig tilbage til index.ejs
        console.log(err);
        res.redirect("/");
      }
    } else {
      res.redirect("/login");
    }
  });
  
  router.get("/:id/edit", async (req, res) => {
    if (req.isAuthenticated()) {
      const response = await fetch(process.env.API + "/ad/" + req.params.id);
      const data = await response.json();
      res.render("ad.ejs", {
        posturl: "/ad/" + req.params.id + "/edit",
        ad: data.data,
      });
    } else {
      res.redirect("/login");
    }
  });
  router.post("/:id/edit", async (req, res) => {
    if (req.isAuthenticated()) {
      try {
        let uploadpath = "";
        if (req.files) {
          uploadpath = `/uploads/${req.files.image.name}`;
          req.files.image.mv("." + uploadpath, (err) => {
            if (err) console.log(err);
          });
        }

        const requestOptions = {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            id: req.params.id,
            title: req.body.title,
            price: req.body.price,
            category: req.body.category,
            image: uploadpath,
            user: req.user.Id,
          }),
        };
        const response = await fetch(process.env.API + "/ad/" + req.params.id,requestOptions);
        const data = await response.json();
        res.redirect("/");
      } catch (err) {
        console.log(err);
        res.redirect("/");
      }
    } else {
      res.redirect("/login");
    }
  });
  
  
  router.get("/:id/delete", async (req, res) => {
    if (req.isAuthenticated()) {
      const requestOptions = {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      };
      const response = await fetch(process.env.API + "/ad/" + req.params.id,requestOptions);
      const data = await response.json();
      res.redirect("/");
    } else {
      res.redirect("/login");
    }
  });

  module.exports = router;