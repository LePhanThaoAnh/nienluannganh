const express = require('express');
const path = require('path');
var cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const route = require("./src/index");
const app = express();
app.set("views", "./src/views");
app.use(cookieParser("secret"));
app.use(express.static(path.join(__dirname, "src", "public")));
app.use("/sweetalert", express.static(path.join(__dirname, "node_modules/sweetalert")));
app.use(bodyParser.urlencoded({ limit: "100mb", extended: true }));
app.use(express.json({ limit: "100mb" }));
app.set('view engine', 'jade');
app.set("view engine", "ejs");

app.use("/", route);

module.exports = app

