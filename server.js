const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const port = process.env.port || 3001; 

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

// Ansluter till databas-filen.
const db = require("./database");
  
// Lägger till vägar till de olika sidorna.
// Index-filen/startsidan hämtar kurserna, sorterar via "created" och skriver ut via "courseList".
app.get("/", (req, res) => {
    const query = "SELECT * FROM courses ORDER BY created DESC";

    db.query(query, (error, results) => {
        if(error) {
            console.error("Fel vid hämtning från databasen: " + error);
        }
        res.render("index", { courseList: results });
    })
});

app.get("/addcourse", (req, res) => {
    res.render("addcourse");
});

// "POST" som fångar de användaren matat in i formuläret.
// skickar med inmatningen
app.post("/addcourse", (req, res) => {
    // Tar name-attributen i formuläret.
    const { coursecode, coursename, syllabus, progression } = req.body;

    // lägger till en ny rad i databasens tabell courses.
    // SQL-injektion förhindras genom frågetecknen. Ett frågetecken per insert-värde.
    const query = `INSERT INTO courses (
        coursecode,
        coursename,
        syllabus,
        progression ) VALUES (?, ?, ?, ?)`;

        // Kör frågan med värdena som matats in.
        db.query(query, [coursecode, coursename, syllabus, progression], (error, results) => {
            if(error) {
                console.log("Fel vid insättning till databasen: " + error);
            }

            // skickar användaren till startsidan där kurslistan visas om inte error körs.
            res.redirect("/");
        })
});

app.get("/about", (req, res) => {
    res.render("about");
});

// Startar port och skriver ut till konsol.
app.listen(port, () => {
    console.log("Server started on: http://localhost:" + port)
});