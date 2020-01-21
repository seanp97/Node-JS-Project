const path = require("path");
const express = require("express");
const app = express();
const exphbs = require("express-handlebars");
const bodyParser = require("body-parser");
const mysql = require("mysql");

var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "node"
  });

con.connect(function (err) {
    if (err) throw err;
});

app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, '/views'));
app.use(express.urlencoded());

app.get("/", function(req, res) {
    con.query("SELECT * FROM NodeSQL", function (err, result, fields) {
        if (err) throw err;
        res.render("index", {layout: "main", data: result});
    });
    //res.render("index", {layout: "main"});
});

app.get("/about", function(req, res) {
    con.query("SELECT name FROM NodeSQL", function (err, result) {
        if (err) throw err;
        res.render("about", {layout: "main", data: result})
    });
    //res.render("about", {layout: "main"});
});

app.listen(8092);
