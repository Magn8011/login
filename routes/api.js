//henter nogler moduler, funktioner via "require"
var express = require("express");
var router = express.Router();
var db = require("../database");

//viser hvilken ad der tilhører det angivede id
router.get("/ad/:id", (req, res) => {
  var sql = "SELECT * FROM Announcement WHERE Id = ?";
  var params = [req.params.id];
//viser hvordan data hentes og der sendes en fejl hvis ikke det lykkes at finde dataen
  db.get(sql, params, (err, row) => {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
//sender en "success" besked hvis dataen findes
    res.json({
      message: "success",
      data: row,
    });
  });
});
/*
illustrerer hvordan data skrives i SQL format

CREATE TABLE IF NOT EXISTS Announcement (
  Id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
  Title TEXT,
  Price TEXT,
  Category TEXT,
  Location TEXT,
  Image TEXT,
  Created DATETIME,
  UserId INTEGER
);*/

router.put("/ad/:id", (req, res, next) => {
//angiver hvilke variabler der er i data og hvordan disse findes
  var data = {
    title: req.body.title,
    price: req.body.price,
    category: req.body.category,
    image: req.body.image,
  };
// viser hvordan data indhentes, på funktionen "run", COALESCE bruges i SQL-formatet
  db.run(
    `UPDATE Announcement SET 
      Title = COALESCE(?,title), 
      Price = COALESCE(?,price),
      Category = COALESCE(?,category),
      Image = COALESCE(?,image)
      WHERE Id = ?`,
    [data.title, data.price, data.category, data.image, req.params.id],
    function (err, result) {
      if (err) {
        console.log(err);
        res.status(400).json({ error: res.message });
        return;
      }
      res.json({
        message: "success",
        data: data,
        changes: this.changes,
      });
    }
  );
});
// viser hvordan man sletter en ad på ens id og hvordan dette formateres i sql, man benytter metoden "delete" og sletter 
// fra announcement på ens eget id
router.delete("/ad/:id", (req, res) => {
  var sql = "DELETE FROM Announcement WHERE Id = ?";
  var params = [req.params.id];
  db.get(sql, params, (err, row) => {
    if (err) {
      console.log(err)
      res.status(400).json({ error: err.message });
      return;
    }
    res.json({
      message: "success",
    });
  });
});
//laver et POST request
router.post("/ad/", (req, res, next) => {
  var data = {
    title: req.body.title,
    price: req.body.price,
    category: req.body.category,
    image: req.body.image,
    user: req.body.user
  };
// viser hvilke data der skal være, når en announcement oprettes
  var sql =
    "INSERT INTO Announcement (Title, Price, Category, Location, Image, UserId) VALUES (?,?,?,?,?,?)";
  var params = [data.title, data.price, data.category, '', data.image, data.user];
  db.run(sql, params, function (err, result) {
    if (err) {
      console.log(err);
      res.status(400).json({ error: err.message });
      return;
    }
    res.json({
      message: "success",
      data: data,
      id: this.lastID,
    });
  });
});
//laver en funktion som henter og læser announcements 
router.get("/announcements", function (req, res, next) {
  var sql = "SELECT * FROM Announcement";
  var params = [];
  db.all(sql, params, (err, rows) => {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.json({
      message: "success",
      data: rows,
    });
  });
});
//angiver funktionen omkring kategorier
router.get("/categories", function (req, res, next) {
  var sql = "select DISTINCT Category from Announcement";
// variablen params, tildeles umildbart ikke noget data, men dette indsættes løbende
  var params = [];
  db.all(sql, params, (err, rows) => {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.json({
      message: "success",
      data: rows,
    });
  });
});




// User API 
//angiver hvordan man vælger users
router.get("/users", function (req, res, next) {
  var sql = "select * from User";
  var params = [];
  db.all(sql, params, (err, rows) => {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.json({
      message: "success",
      data: rows,
    });
  });
});

//angiver at hvordan man ser alle announcements på et særligt id
router.get("/user/:id/ads", (req, res) => {
  var sql = "SELECT * FROM Announcement WHERE UserId = ?";
  var params = [req.params.id];
  db.all(sql, params, (err, rows) => {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.json({
      message: "success",
      data: rows,
    });
  });
});

router.get("/user/:id", (req, res) => {
  var sql = "SELECT * FROM User WHERE Id = ?";
  var params = [req.params.id];
//bruger "get" metoden
  db.get(sql, params, (err, row) => {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.json({
      message: "success",
      data: row,
    });
  });
});

// angiver at alle users har et brugernavn og en email
router.put("/user/:id", (req, res, next) => {
  var data = {
    name: req.body.name,
    email: req.body.email,
  };
  console.log(data);
  db.run(
// bruger "COALESCE" som er en funktion i som kan bruges i SQL, den returnerer de værdier der ikke er "NULL" 
    `UPDATE User SET Name = COALESCE(?,name), Email = COALESCE(?,email) WHERE Id = ?`,
    [data.name, data.email, req.params.id],
    function (err, result) {
      if (err) {
        console.log(err);
        res.status(400).json({ error: res.message });
        return;
      }
      res.json({
        message: "success",
        data: data,
        changes: this.changes,
      });
    }
  );
});

// hvordan man sletter en bruger, dette gøres på id
router.delete("/user/:id", (req, res) => {
  var sql = "DELETE FROM User WHERE Id = ?";
  var params = [req.params.id];
  db.get(sql, params, (err, row) => {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.json({
      message: "success",
    });
  });
});
//angiver forskellige fejl, der er vedlagt en besked til de forskellige fejl
router.post("/user/", (req, res, next) => {
  var errors = [];
  if (!req.body.password) {
    errors.push("No password specified");
  }
  if (!req.body.email) {
    errors.push("No email specified");
  }
  if (errors.length) {
    res.status(400).json({ error: errors.join(",") });
    return;
  }
  // viser hvilke data der skal til i brugeren
  var data = {
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
  };
  //angiver hvordan man indsætter en ny bruger ind i "User"
  var sql =
    "INSERT INTO User (Name, Email, Password, Admin, Gold) VALUES (?,?,?,?,?)";
  var params = [data.name, data.email, data.password, 0, 0];
  db.run(sql, params, function (err, result) {
    if (err) {
      console.log(err);
      res.status(400).json({ error: err.message });
      return;
    }
    res.json({
      message: "success",
      data: data,
      id: this.lastID,
    });
  });
});
// eksporterer "router" funktionen
module.exports = router;