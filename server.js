const express = require("express");
const app = express();
const port = process.env.port || 3001; 

app.get("/", (req, res) => {
    res.send("Hello world!");
});

app.listen(port, () => {
    console.log("Server started on: http://localhost:" + port)
});