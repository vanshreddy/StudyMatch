const express = require("express");
const morgan = require("morgan");
const mysql = require("mysql2");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(morgan("dev"));

const dbConfig = {
  host: "localhost",
  user: "sune2",
  password: "",
  database: "database_name",
};

const pool = mysql.createPool(dbConfig);

pool.getConnection((err, connection) => {
  if (err) {
    console.error("Error connecting to MySQL:", err);
    return;
  }
  console.log("Connected to MySQL");
  connection.release();
});

app.get("/ping", (req, res) => {
  return res.send({ status: "Healthy" });
});

// User registration endpoint
app.post("/register", (req, res) => {
  const { username, password } = req.body;

  const query = "INSERT INTO users (username, password) VALUES (?, ?)";
  pool.query(query, [username, password], (err) => {
    if (err) {
      console.error("Error executing MySQL query:", err);
      return res.status(500).send("Database error");
    }
    res.send({ status: "User registered successfully!" });
  });
});

// User login endpoint
app.post("/login", (req, res) => {
  const { username, password } = req.body;

  const query = "SELECT * FROM users WHERE username = ? AND password = ?";
  pool.query(query, [username, password], (err, results) => {
    if (err) {
      console.error("Error executing MySQL query:", err);
      return res.status(500).send("Database error");
    }

    if (results.length === 0) {
      return res.status(401).send("Invalid username or password");
    }

    res.send({ status: "Login successful!" });
  });
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something went wrong!");
});

app.listen(PORT, () => {
  console.log("Server started listening on port:", PORT);
});
