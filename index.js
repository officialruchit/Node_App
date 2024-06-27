const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const dbConnection = require("./config/db");

const port = 3333;

// Connect to database
dbConnection();

// Middleware to parse JSON bodies
app.use(bodyParser.json());

// Use the routes
app.use("/api/auth", require("./routes/authRoute"));

// Start server
app.listen(port, () => console.log(`Example app listening on port ${port}!`));
