if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}
var sqlite3 = require("sqlite3").verbose();

// Connection til vores database
let db = new sqlite3.Database(process.env.DB, (err) => {
  if (err) {
// hvis der er fejl ved opstart af applikationen
    console.log("Error Occurred - " + err.message);
  } else {
// angiver den besked som sendes til ens computer, når applikation startes
    console.log("DataBase Connected");
  }
});
module.exports = db;