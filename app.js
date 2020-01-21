const path = require("path");
const express = require("express");
const app = express();
const exphbs = require("express-handlebars");

app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, 'views'));

app.get("/", function(req, res) {
    res.render("index", {layout: "main"});
});

app.listen(8085);