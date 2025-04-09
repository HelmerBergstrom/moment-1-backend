const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const port = process.env.port || 3001; 

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true }));

// Lägger till vägar till de olika sidorna.
app.get("/", (req, res) => {
    res.render("index");
});

app.get("/addmember", (req, res) => {
    res.render("addmember");
});

app.get("/about", (req, res) => {
    res.render("about");
});

// Startar port och skriver ut till konsol.
app.listen(port, () => {
    console.log("Server started on: http://localhost:" + port)
});