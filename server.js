if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const express = require("express");
const app = express();
const bcrypt = require("bcrypt");
const passport = require("passport");
const flash = require("express-flash");
const session = require("express-session");
const fs = require("fs");
const _ = require("lodash");
const { nanoid } = require("nanoid");
const fileUpload = require("express-fileupload");

//sætter min template engine til at være "ejs"
app.set("veiw-engine", "ejs");

//Normalt vil man aldrig efterlade disse "[]" tomme, men da jeg ikke skal oprette en hel database
//så kan jeg bare lave programmet sådan her og køre den lokalt på min egen server

//opretter en variabel som initiater en user databaser, og taler med min "login.json"
//defensive programming fordi programmet i "værste fald" returnerer en tom "[]"

let users = [];
let products = [];
let categories = [];
const loginfil = "./login.json";
const productfil = "./products.json";

// bruger "fs.readFileSync" til at læse min json fil, opretter en variabel kaldet "loginfil"
//og angiver at users nu har indeholdet fra "JSON.parse(rawdata)" altså det som ligger i min json
try {
  if (fs.existsSync(loginfil)) {
    //kør altid de to følgende linjer for at sørge for at funktionen kører
    let rawdata = fs.readFileSync(loginfil);
    users = JSON.parse(rawdata);
  }
  //hvis ikke denne profil findes, så (derfor det er defensive programming) sender jeg [] tilbage
} catch (err) {
  users = [];
}

const initializePassport = require("./passport-config");
initializePassport(
  passport,
  //angiv hvordan man finder id og email
  (email) => users.find((user) => user.email === email),
  (id) => users.find((user) => user.id === id)
);
//gør brug af express.urlencoded, flash og session
app.use(express.urlencoded({ extended: false }));
app.use(flash());
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
  })
);
//bruger passport.initialize og passport.session til at holde min loginserver kørende og validere brugerens autensitet
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static("assets"));
app.use("/uploads", express.static("uploads"));

app.use(fileUpload());

/**
  Hjemmeside - index side
 */

app.get("/", (req, res) => {
  if (fs.existsSync(productfil)) {
    let rawdata = fs.readFileSync(productfil);
    // parse er det modsat af stringify, så når man henter json data, den kunne lige så godt hedde objectify
    products = JSON.parse(rawdata);
    if (req.isAuthenticated()) {
      products = _.filter(products, function (prod) {
        return prod.user === req.user.id;
      });
    }
    //bruger "map" til at finde kategorierne, filtrere de forkerte fra og hente den kategori der trykkes på
    categories = products
      .map((item) => item.category)
      .filter((value, index, self) => self.indexOf(value) === index);
  }
  res.render("index.ejs", {
    //angiver productdata og categorylist
    productdata: products,
    categorylist: categories,
    auth: req.isAuthenticated(),
  });
});

/**
  Ny produkt
 */

app.get("/newproduct", (req, res) => {
  if (req.isAuthenticated()) {
    res.render("product.ejs", {
      posturl: "/newproduct",
      product: {
        name: "",
        price: "",
        category: "",
      },
    });
  } else {
    res.redirect("/login");
  }
});
app.post("/newproduct", async (req, res) => {
  if (req.isAuthenticated()) {
    try {
      let uploadpath = ""
      if (req.files) {
        uploadpath = `/uploads/${req.files.image.name}`;
        req.files.image.mv("." + uploadpath, (err) => {
          if (err) console.log(err);
        });
      }
      //angiv "rawdata" burg "fs.readFileSync" til at vise filen som tidligere er angivet til at være = product.json
      let rawdata = fs.readFileSync(productfil);
      products = JSON.parse(rawdata);
      // så pusher jeg et nyt product ind, giver den et random id via funktionen "nanoid()", henter navn, pris, kategori og billede
      products.push({
        id: nanoid(),
        name: req.body.name,
        price: req.body.price,
        category: req.body.category,
        image: uploadpath,
        user: req.user.id,
      });
      let data = JSON.stringify(products);
      fs.writeFileSync(productfil, data);
      //sender tilbage til hovedsiden (index.ejs)
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

/**
  Opdatere produkt
 */

app.get("/editproduct/:id", (req, res) => {
  if (req.isAuthenticated()) {
    let rawdata = fs.readFileSync(productfil);
    products = JSON.parse(rawdata);
    var product = _.find(products, { id: req.params.id });
    res.render("product.ejs", {
      posturl: "/editproduct/" + req.params.id,
      product: product,
    });
  } else {
    res.redirect("/login");
  }
});
app.post("/editproduct/:id", async (req, res) => {
  if (req.isAuthenticated()) {
    try {
      const uploadpath = `/uploads/${req.files.image.name}`;
      req.files.image.mv("." + uploadpath, (err) => {
        if (err) console.log(err);
      });

      //kør altid de to følgende linjer for at sørge for at funktionen kører
      let rawdata = fs.readFileSync(productfil);
      products = JSON.parse(rawdata);
      /*
       map funktion for at finde den produkt som skal redigeres
      */
      var products = _.map(products, function (prod) {
        return prod.id === req.params.id
          ? {
              id: req.params.id,
              name: req.body.name,
              price: req.body.price,
              category: req.body.category,
              image: uploadpath,
              user: prod.user,
            }
          : prod;
      });
      let data = JSON.stringify(products);
      fs.writeFileSync(productfil, data);
      res.redirect("/");
    } catch (err) {
      console.log(err);
      res.redirect("/");
    }
  } else {
    res.redirect("/login");
  }
});

/**
  Slet produkt
 */

app.get("/deleteproduct/:id", (req, res) => {
  if (req.isAuthenticated()) {
    //kør altid de to følgende linjer for at sørge for at frisk data er hentet fra json
    let rawdata = fs.readFileSync(productfil);
    products = JSON.parse(rawdata);
    products = _.remove(products, function (prod) {
      return prod.id !== req.params.id;
    });
    let data = JSON.stringify(products);
    fs.writeFileSync(productfil, data);
    res.redirect("/");
  } else {
    res.redirect("/login");
  }
});

/**
  Login
 */

/* Dette er mim login sektion som responder til siden "login.ejs", ydermere bruger jeg 
funktionen passport.authenticate, for at tjekke hvorvidt at password er korret, hvis dette er tilfældet
redirectes man til en "du er nu logget ind" side og hvis det er forkert så redirectes man til 
login siden og kan prøve igen 
*/

app.get("/login", (req, res) => {
  res.render("login.ejs");
});
app.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/login",
    failureFlash: true,
  })
);
/**
  Logout
 */

app.get("/logout", (req, res) => {
  req.session.destroy();
  req.logout();
  res.redirect("/");
});

/**
  Oprette Profil
 */

/*Herunder opretter og kører jeg de forskellige kommandoer som mit "opret bruger" system skal kunne
jeg henviser også min side til min "register.ejs" hvor jeg blandt andet har mine html-koder 
som skal være på min "opretbruger"-side. Hertil sørger jeg for at min kode redirecter en 
nyoprettet bruger til login siden
*/
app.get("/register", (req, res) => {
  res.render("profile.ejs", {
    user: {
      name: "",
      email: "",
    },
    posturl: "/register",
  });
});
//
app.post("/register", async (req, res) => {
  try {
    let rawdata = fs.readFileSync(loginfil);
    users = JSON.parse(rawdata);
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    users.push({
      id: nanoid(),
      name: req.body.name,
      email: req.body.email,
      password: hashedPassword,
    });
    let data = JSON.stringify(users);
    fs.writeFileSync(loginfil, data);
    res.redirect("/login");
  } catch {
    res.redirect("/register");
  }
});

/**
  Opdatere profil
  bruger profil kommer fra passport bibliotek og findes i req.user object.
 */

app.get("/profile", (req, res) => {
  if (req.isAuthenticated()) {
    let rawdata = fs.readFileSync(loginfil);
    users = JSON.parse(rawdata);
    var user = _.find(users, { id: req.user.id });

    res.render("profile.ejs", {
      user: user,
      posturl: "/profile",
    });
  } else {
    res.redirect("/login");
  }
});

app.post("/profile", async (req, res) => {
  if (req.isAuthenticated()) {
    /**
     Opdatere JSON data 
     */
    let rawdata = fs.readFileSync(loginfil);
    users = JSON.parse(rawdata);
    var users = _.map(users, function (user) {
      return user.id === req.user.id
        ? {
            id: user.id,
            name: req.body.name,
            email: req.body.email,
            password: user.password,
          }
        : user;
    });
    let data = JSON.stringify(users);
    fs.writeFileSync(loginfil, data);

    res.redirect("/");
  } else {
    res.redirect("/login");
  }
});

/**
  Slette profil
 */

//til "deleteuser" funktionen på min index.js side. først laver jeg en app.get for at hente funktionen
app.get("/deleteuser", (req, res) => {
  if (req.isAuthenticated()) {
    let rawdata = fs.readFileSync(loginfil);
    users = JSON.parse(rawdata);
    //så henter jeg users, eftersom at jeg tillod users variablen til at indholde mine json users, på linje 28
    //fortæller at hvis email === email så skal jeg via ".remove" (som jeg hentede med pakken lodash)
    //delete denne bruger og herefter "logout" og redirecte til "login.ejs" siden
    users = _.remove(users, function (user) {
      return user.id !== req.user.id;
    });
    let data = JSON.stringify(users);
    fs.writeFileSync(loginfil, data);
    req.logout();
    res.redirect("/login");
  } else {
    res.redirect("/login");
  }
});

//Her er porten hvorpå min localhost lytter, altså port 3010
app.listen(3010);
