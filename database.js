if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}
var sqlite3 = require("sqlite3").verbose();

// Connecting Database
let db = new sqlite3.Database(process.env.DB, (err) => {
  if (err) {
    console.log("Error Occurred - " + err.message);
  } else {
    console.log("DataBase Connected");
  }
});
module.exports = db;
