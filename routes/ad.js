if (process.env.NODE_ENV !== "production") {
    require("dotenv").config();
  }
//henter diverse moduler/ libraries 
  var express = require("express");
  var fetch = require("node-fetch");
  var router = express.Router();
  
//angiver hvilken route der køres på i dette tilfælde ".../new", hertil hvad der skal være i en ny ad
    router.get("/new", (req, res) => {
//angiver at man skal være "authenticated" for at kunne oprette en ny ad
        if (req.isAuthenticated()) {
//render til "ad.ejs" som ligger i "views" mappen
        res.render("ad.ejs", {
          posturl: "/ad/new",
          ad: {
            name: "",
            price: "",
            category: "",
          },
        });
// hvis ikke man er authenticated, så bliver man redirected til "/login" så man kan blive authenticated
      } else {
        res.redirect("/login");
      }
    });
  
// angiver at denne function skal køres asynkront og angiver selvfølgelig at man skal være authenticated
    router.post("/new", async (req, res) => {
      if (req.isAuthenticated()) {
        try {
// angiver at variablen kan være tom, og herefter hvordan man indsætter billeder i "ad"
          let uploadpath = "";
          if (req.files) {
            uploadpath = `/uploads/${req.files.image.name}`;
            req.files.image.mv("." + uploadpath, (err) => {
              if (err) console.log(err);
            });
          }
// Angiver hvordan data læses, altså i json-format og hvad der indgår i den her data, altså "title" osv
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
// angiver at funktionerne skal vente med at køres før at nogle andre funktioner er kørt
          const response = await fetch(process.env.API + "/ad",requestOptions);
          const data = await response.json();
  
          res.redirect("/");
        } catch (err) {
// giver en error og sender dig tilbage til index.ejs
          console.log(err);
          res.redirect("/");
        }
// ellers redirectes man til "/login"
      } else {
        res.redirect("/login");
      }
    });
    
//angiver rediger "ad" og at denne køres asynkront 
    router.get("/:id/edit", async (req, res) => {
      if (req.isAuthenticated()) {
// angiver at "response" og "data" skal vente med at køres, til de andre funktioner 
        const response = await fetch(process.env.API + "/ad/" + req.params.id);
        const data = await response.json();
//angiver at det er "ad.ejs" som bliver render
        res.render("ad.ejs", {
          posturl: "/ad/" + req.params.id + "/edit",
          ad: data.data,
        });
      } else {
        res.redirect("/login");
      }
    });
// Hvordan man opdaterer et billede til en "ad"
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
/*
          const uploadpath = `/uploads/${req.files.image.name}`;
          req.files.image.mv("." + uploadpath, (err) => {
            if (err) console.log(err);
          });
*/
   console.log(req.files)
// "PUT" bruges til at opdatere URL'en eller hvis ikke der er en URL oprettes der en
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
//redirecter til "/" siden
          res.redirect("/");
        } catch (err) {
// logger en error
          console.log(err);
          res.redirect("/");
        }
      } else {
        res.redirect("/login");
      }
    });
    
// Angiver "delete" altså hvordan man sletter en ad
    router.get("/:id/delete", async (req, res) => {
      if (req.isAuthenticated()) {
        const requestOptions = {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
        };
        const response = await fetch(process.env.API + "/ad/" + req.params.id,requestOptions);
        const data = await response.json();
//redirectes til siden "/"
        res.redirect("/");
      } else {
        res.redirect("/login");
      }
    });
  
//eksporterer funktionen "router"
    module.exports = router;