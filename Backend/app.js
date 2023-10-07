const express = require("express");
const morgan = require("morgan");
const app = express();  //Create new instance
const PORT = process.env.PORT || 3000; //Declare the port number
app.use(express.json()); //allows us to access request body as req.body
app.use(morgan("dev"));  //enable incoming request logging in dev mode
 
//Define the endpoint
app.get("/ping", (req, res) => {  
  return res.send({
    status: "Healthy",
  });
});
app.listen(PORT, () => {
  console.log("Server started listening on port : ", PORT);
});

//Error Handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something went wrong!");
});

const express = require("express");
const morgan = require("morgan");
const mysql = require("mysql2"); // Import the mysql2 package
const app = express(); // Create a new instance
const PORT = process.env.PORT || 3000; // Declare the port number
app.use(express.json()); // Allows us to access request body as req.body
app.use(morgan("dev")); // Enable incoming request logging in dev mode

// Define the database connection configuration
const dbConfig = {
  host: "localhost",
  user: "sune2",
  password: "",
  database: "database_name",
};

// Create a MySQL connection pool
const pool = mysql.createPool(dbConfig);

// Error handling for the database connection
pool.getConnection((err, connection) => {
  if (err) {
    console.error("Error connecting to MySQL:", err);
    return;
  }
  console.log("Connected to MySQL");
  connection.release(); // Release the connection back to the pool
});

// Define the endpoint
app.get("/ping", (req, res) => {
  return res.send({
    status: "Healthy",
  });
});

// Example route that queries the database
app.get("/users", (req, res) => {
  pool.query("SELECT * FROM users", (err, results) => {
    if (err) {
      console.error("Error executing MySQL query:", err);
      return res.status(500).send("Database error");
    }
    res.json(results);
  });
});

app.listen(PORT, () => {
  console.log("Server started listening on port:", PORT);
});

