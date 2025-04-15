const express = require("express");
require("dotenv").config();
const bodyParser = require("body-parser");
const app = express();
const port = process.env.PORT; 

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

// Ansluter till databas-filen.
const db = require("./database");
  
// Lägger till vägar till de olika sidorna.
// Index-filen/startsidan hämtar kurserna och skriver ut via "courseList".
app.get("/", (req, res) => {
    const query = "SELECT * FROM courses";

    db.query(query, (error, results) => {
        if(error) {
            console.error("Fel vid hämtning från databasen: " + error);
        }
        // Kontrollerar om results.rows är en array. Om det är det sätts courseList till results.rows.
        // Sätter till en tom array om det inte är en array.
        const courseList = Array.isArray(results.rows) ? results.rows : [];        
        res.render("index", { courseList });
    })
});

// Skickar med formulärfälten med tomma strängar och error.
app.get("/addcourse", (req, res) => {
    res.render("addcourse", {
        errors: [],
        coursecode: '',
        coursename: '',
        syllabus: ''
    });
});

// "POST" som fångar de användaren matat in i formuläret.
// skickar med inmatningen
app.post("/addcourse", (req, res) => {
    // Tar name-attributen i formuläret.
    const { coursecode, coursename, syllabus, progression } = req.body;
    let errors = [];

    // Deklarerar variabler för formulärfälten.
    let newCourseCode = req.body.coursecode;
    let newCourseName = req.body.coursename; 
    let newSyllabus = req.body.syllabus; 
    let newProgression = req.body.progression; 

    // Skriver ut felmeddelanden om allt inte är ifyllt.
    if(newCourseCode === "") {
        errors.push("Du måste ange en kurskod!")
    }
    if(newCourseName === "") {
        errors.push("Du måste ange ett kursnamn!")
    }
    if(newSyllabus === "") {
        errors.push("Du måste ange korrekt länk!")
    }
    if (!newProgression || newProgression === "") {
        errors.push("Du måste ange en progression!");
    }    

    // Finns error skickas användaren tillbaks till addCourse-sidan där formuläret finns.
    // Skickar även med formulärfälten.
    if (errors.length > 0) {
        return res.render("addcourse", { errors, coursecode, coursename, syllabus, progression });
    }

    // lägger till en ny rad i databasens tabell courses.
    // SQL-injektion förhindras genom frågetecknen. Ett frågetecken per insert-värde.
    const query = `INSERT INTO courses (
        coursecode,
        coursename,
        syllabus,
        progression ) VALUES ($1, $2, $3, $4)`;

        // Kör frågan med värdena som matats in.
        db.query(query, [coursecode, coursename, syllabus, progression], (error, results) => {
            if(error) {
                console.log("Fel vid insättning till databasen: " + error);
            }

            // skickar användaren till startsidan där kurslistan visas om inte error körs.
            res.redirect("/");
        })
});

// app.post som körs när användaren raderar en rad i kurslistan. "id" är alltså primärnyckeln i databasen/tabellen.
app.post("/deletecourse", (req, res) => {
    // Hämtar id från den rad som användaren klickar "radera" på.
    const { id } = req.body;

    const query = "DELETE FROM courses WHERE id = $1";

    db.query(query, [id], (error, results) => {
        if(error) {
            console.error("Gick inte att radera: " + error);
        }

        // Skickar användaren tillbaka till startsidan med uppdaterad lista.
        res.redirect("/");
    })
})

app.get("/about", (req, res) => {
    res.render("about");
});

// Startar port och skriver ut till konsol.
app.listen(port, () => {
    console.log("Server started on: http://localhost:" + port)
});