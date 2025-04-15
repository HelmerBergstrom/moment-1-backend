const { Client } = require("pg");

const client = new Client({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    port: process.env.DB_PORT || 5432,
    ssl: {
        rejectUnauthorized: true
    }
});

// Kontrollerar om det går att anstluta.
client.connect((error) => {
    if (error) {
        console.error("Connection fail: " + error);
        return;
    }

    console.log("Connection success!");

    // Skapar tabell "courses" om den inte redan finns, om det går att ansluta.
    client.query(`CREATE TABLE IF NOT EXISTS courses (
        id SERIAL PRIMARY KEY,
        coursecode VARCHAR(20),
        coursename VARCHAR(200),
        syllabus VARCHAR(255),
        progression VARCHAR(255)
    )`, (err, result) => {
        release(); 
        if (err) {
            console.error("Fel av skapande (tabell)", err);
        } else {
            console.log("Table created IF NOT EXISTS", result);
        }
    });
});

module.exports = client;