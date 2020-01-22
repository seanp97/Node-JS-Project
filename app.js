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
    console.log("Connected");
});

app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, '/views'));
app.use(express.static(__dirname + '/src'));
//app.use(express.bodyParser());
app.use(bodyParser.urlencoded({
    extended: true
}));

app.get("/", function(req, res) {
    con.query("SELECT * FROM NodeSQL", function (err, result, fields) {
        if (err) throw err;
        res.render("index", {layout: "main", data: result});
    });
});

app.get("/about", function(req, res) {
    con.query("SELECT name FROM NodeSQL", function (err, result) {
        if (err) throw err;
        res.render("about", {layout: "main", data: result})
    });
});

app.post('/adduser', function(req, res) {
    con.query(`INSERT INTO NodeSQL (name) VALUES ("${req.body.name}")`, function (err) {
        if (err) throw err;
        console.log(err);
        //res.send("Updated with " + req.body.name);
        res.render("addpost", {layout: "main"});
    });
});

app.get('/delete/:id', function(req, res) {
    con.query(`DELETE FROM NodeSQL WHERE id="${req.params.id}"`, function (err) {
        if (err) throw err;
        res.render("delete", {layout: "main"});
    });
});

app.get('/edit/:id', function(req, res) {
    con.query(`SELECT * FROM NodeSQL WHERE id="${req.params.id}"`, function (err, result, fields) {
        if (err) throw err;
        res.render("edit", {layout: "main", data: result});
    });
});


app.post('/edituser/:id',(req, res) => {
    con.query(`UPDATE NodeSQL SET name = "${req.body.edit}" WHERE id = "${req.params.id}"`), function(err) {
        if (err) throw err;
        res.render("edituser", {layout: "main"});
    }
  });


app.listen(8081);