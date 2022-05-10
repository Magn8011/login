if (process.env.NODE_ENV !== "production") {
    require("dotenv").config();
  }
  var express = require("express");
  var fetch = require("node-fetch");
  var router = express.Router();
  const bcrypt = require("bcrypt");
  
  /*Herunder opretter og kører jeg de forskellige kommandoer som mit "opret bruger" system skal kunne
  jeg henviser også min side til min "register.ejs" hvor jeg blandt andet har mine html-koder 
  som skal være på min "opretbruger"-side. Hertil sørger jeg for at min kode redirecter en 
  nyoprettet bruger til login siden
  */
  router.get("/", (req, res) => {
    res.render("profile.ejs", {
      user: {
        name: "",
        email: "",
      },
      posturl: "/register",
    });
  });
  
  
  router.post("/", async (req, res) => {
    try {
      const hashedPassword = await bcrypt.hash(req.body.password, 10);
      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: req.body.name,
          email: req.body.email,
          password: req.body.password,
        }),
      };
      const response = await fetch(process.env.API + "/user/",requestOptions);
      const data = await response.json();
      res.redirect("/login");
    } catch {
      res.redirect("/register");
    }
  });
  
  module.exports = router;
  
  