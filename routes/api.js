var express = require("express");
var router = express.Router();
var db = require("../database");

router.delete("/ad/:id/follower/:userid", (req, res) => {
  var sql = "DELETE FROM Follow WHERE UserId = ? AND AnnouncementId = ?";
  var params = [req.params.userid, req.params.id];
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
router.post("/ad/:id/follower/:userid", (req, res) => {
  var sql = "INSERT INTO Follow (UserId, AnnouncementId) VALUES (?,?)";
  var params = [req.params.userid, req.params.id];
  db.run(sql, params, function (err, result) {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.json({
      message: "success",
      id: this.lastID,
    });
  });
});

router.get("/ad/:id", (req, res) => {
  var sql = "SELECT * FROM Announcement WHERE Id = ?";
  var params = [req.params.id];
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

router.put("/ad/:id", (req, res, next) => {
  var data = {
    title: req.body.title,
    price: req.body.price,
    category: req.body.category,
    image: req.body.image,
  };
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

router.delete("/ad/:id", (req, res) => {
  var sql = "DELETE FROM Announcement WHERE Id = ?";
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
router.post("/ad/", (req, res, next) => {
  var data = {
    title: req.body.title,
    price: req.body.price,
    category: req.body.category,
    image: req.body.image,
    user: req.body.user,
  };
  var sql =
    "INSERT INTO Announcement (Title, Price, Category, Location, Image, UserId) VALUES (?,?,?,?,?,?)";
  var params = [
    data.title,
    data.price,
    data.category,
    "",
    data.image,
    data.user,
  ];
  db.run(sql, params, function (err, result) {
    if (err) {
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

router.get("/announcements/:id?", function (req, res, next) {
  if (req.params.id) {
    var sql = `
  SELECT 
  Announcement.Id AS Id, Title, Price, Category, Location, Image, Created, UserId, Gold,
  IFNULL(
    (SELECT 'TRUE' FROM Follow 
      WHERE Follow.AnnouncementId = Announcement.Id 
              AND 
            Follow.UserId = ?
    )
    ,'FALSE'
  ) AS Followed 
  FROM Announcement,User WHERE Announcement.UserId = User.Id ORDER BY Gold DESC, Created DESC`;
  var params = [req.params.id];  
} else {
    var sql = `
    SELECT 
    Announcement.Id AS Id, Title, Price, Category, Location, Image, Created, UserId, Gold
    FROM Announcement,User WHERE Announcement.UserId = User.Id ORDER BY Gold DESC, Created DESC`;
    var params = [];
  }
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

router.get("/categories", function (req, res, next) {
  var sql = "SELECT DISTINCT Category FROM Announcement";
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

/** User API */

router.get("/users", function (req, res, next) {
  var sql = "SELECT * FROM User";
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

router.get("/user/:id/follow", (req, res) => {
  var sql =
    "SELECT * FROM Follow,Announcement WHERE Follow.UserId = ? AND Follow.AnnouncementId = Announcement.Id";
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

router.put("/user/:id", (req, res, next) => {
  var data = {
    name: req.body.name,
    email: req.body.email,
  };
  db.run(
    `UPDATE User SET Name = COALESCE(?,name), Email = COALESCE(?,email) WHERE Id = ?`,
    [data.name, data.email, req.params.id],
    function (err, result) {
      if (err) {
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

router.patch("/user/:id/gold", (req, res) => {
  var sql = "UPDATE  User SET Gold = NOT Gold WHERE Id = ?";
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

router.patch("/user/:id/admin", (req, res) => {
  var sql = "UPDATE  User SET Admin = NOT Admin WHERE Id = ?";
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
  var data = {
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
  };
  var sql =
    "INSERT INTO User (Name, Email, Password, Admin, Gold) VALUES (?,?,?,?,?)";
  var params = [data.name, data.email, data.password, 0, 0];
  db.run(sql, params, function (err, result) {
    if (err) {
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

router.get("/stat", (req, res) => {
    var sql =`
  SELECT 'Det totale antal annoncer' AS Name,COUNT(*) AS Count, 1 as rowOrder FROM Announcement 
  UNION 
  SELECT Name, COUNT(*) AS Count,2 as rowOrder FROM Announcement, User WHERE Announcement.UserId = User.Id GROUP By UserID
  ORDER By rowOrder,Name
  `;    
    db.all(sql, [], (err, rows) => {
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

module.exports = router;
