const mysql = require("mysql");

// Inloggningsuppgifter + inställningar för anslutning.
const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    ssl: {
        rejectUnauthorized: true
    }
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

    console.log("Databas skapad om den inte redan fanns! " + results);
});

// Skapar tabell "courses" med id som primärnyckel.
// Kör IF NOT EXISTS så tabellen endast skapas om den inte finns.
connection.query(`CREATE TABLE IF NOT EXISTS courses (
    id INT AUTO_INCREMENT PRIMARY KEY,
    coursecode VARCHAR(20),
    coursename VARCHAR(200),
    syllabus VARCHAR(255),
    progression VARCHAR(255) )`, (error, results) => {
        if(error) throw error;

        console.log("Table created IF NOT EXISTS " + results)
});

module.exports = connection; // Exporterar anslutningen för att kunna använda den i server.js via "require"

// // Raderar tabell "courses" om tabellen finns.
// connection.query("DROP TABLE IF EXISTS courses", (error, results) => {
//     if(error) throw error;

//     console.log("Tabell raderad " + results);
// });