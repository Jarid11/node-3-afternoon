require("dotenv").config();
const express = require("express");
const { json } = require("body-parser");
const session = require("express-session");

const checkSession = require("./middlewares/checkForSession");

const swagCtrl = require("./controllers/swag_controller");
const authCtrl = require("./controllers/auth_controller");
const cartCtrl = require("./controllers/cart_controller");
const searchCtrl = require("./controllers/search_controller");

const port = 3000;

const app = express();

app.use(json());
app.use(express.static(__dirname + "./../build"));

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: true,
    saveUninitialized: false
  })
);

app.use(checkSession);

app.get("/api/swag", swagCtrl.read);

app.post("/api/login", authCtrl.login);
app.post("/api/register", authCtrl.register);
app.post("/api/signout", authCtrl.signout);
app.get("/api/user", authCtrl.getUser);

app.post("/api/cart", cartCtrl.add);
app.post("/api/cart/checkout", cartCtrl.checkout);
app.delete("/api/cart", cartCtrl.delete);

app.get("/api/search", searchCtrl.filterSwag);

app.listen(port, () => {
  console.log(`Port is running on: ${port}`);
});
