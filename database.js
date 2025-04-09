const mysql = require("mysql");

// Inloggningsuppgifter + inställningar för anslutning.
const connection = mysql.createConnection({
    host: "localhost",
    user: "cvdatabase",
    password: "databaseforcv",
    database: "cv"
});

// Kontroll om det går att ansluta.
connection.connect((error) => {
    if(error) {
        console.error("Connection fail: " + error);
        return;
    }

    console.log("Connection success!")
});

// Kod för att skapa databas OM den inte redan finns.
connection.query("CREATE DATABASE IF NOT EXISTS cv", (error, results) => {
    if(error) throw error;

    console.log("Databas skapad! " + results);
})

// Raderar tabell "courses" om tabellen finns.
connection.query("DROP TABLE IF EXISTS courses", (error, results) => {
    if(error) throw error;

    console.log("Tabell raderad " + results);
});


// Skapar tabell "courses" med id som primärnyckel. Lägger till "created" för att visa tillägningsdatum.
connection.query(`CREATE TABLE courses (
    id INT AUTO_INCREMENT PRIMARY KEY,
    coursecode VARCHAR(20),
    coursename VARCHAR(200),
    syllabus VARCHAR(255),
    progression VARCHAR(255),
    created DATETIME DEFAULT CURRENT_TIMESTAMP )`, (error, results) => {
        if(error) throw error;

        console.log("Table created " + results)
    });