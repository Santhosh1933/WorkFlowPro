const express = require("express");
const dotenv = require("dotenv");
const sql = require("mysql2");

dotenv.config();

const app = express();
app.use(express.json());

// Starting Server

const port = process.env.PORT;
app.listen(port, () => {
  console.log("Server Connected : ", port);
});

// Making sql Connection

const conn = sql.createConnection({
  host: process.env.HOST,
  user: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DBNAME,
});
conn.connect(() => {
  console.log("DataBase Connected");
});

// Login API

app.post("/login", (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }
  // Query the database to check if the user exists
  const query = "SELECT * FROM users WHERE email = ? AND password = ?";
  conn.query(query, [email, password], (error, results) => {
    if (error) {
      console.error("Error querying the database:", error);
      return res.status(500).json({ message: "Internal Server Error" });
    }
    // Check if a user with the provided email and password was found
    if (results.length === 0) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
    // Successful login
    return res
      .status(200)
      .json({ message: "Login successful", data: results[0] });
  });
});

// Register API

app.post("/register", (req, res) => {
  const { name, email, mobile, password } = req.body;
  if (!name || !email || !mobile || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }
  // Insert the new user into the database
  const insertQuery =
    "INSERT INTO users (name, email, mobile, password) VALUES (?, ?, ?, ?)";
  conn.query(insertQuery, [name, email, mobile, password], (error) => {
    if (error) {
      console.error("Error inserting into the database:", error);
      return res.status(500).json({ message: "Internal Server Error" });
    }
    // Registration successful
    return res.status(201).json({ message: "Registration successful" });
  });
});

// Add Tasks

app.post("/add-task/:uid", (req, res) => {
  const uid = req.params.uid;
  const { title, description, problem_link, problem_mode, yt_link } = req.body;

  // Insert the task into the database
  const insertQuery =
    "INSERT INTO tasks (uid, title, description, problem_link, problem_mode, yt_link) VALUES (?, ?, ?, ?, ?, ?)";
  conn.query(
    insertQuery,
    [uid, title, description, problem_link, problem_mode, yt_link],
    (taskInsertError, results) => {
      if (taskInsertError) {
        console.error("Error inserting into the database:", taskInsertError);
        return res
          .status(500)
          .json({ message: "Internal Server Error", taskInsertError });
      }
      // Task creation successful
      return res
        .status(201)
        .json({ message: "Task created successfully", data: results });
    }
  );
});

// getTask API

app.get("/tasks/:uid", (req, res) => {
  const uid = req.params.uid;

  // Query the database to retrieve tasks for the user
  const query = "SELECT * FROM tasks WHERE uid = ?";
  conn.query(query, [uid], (error, results) => {
    if (error) {
      console.error("Error querying the database:", error);
      return res.status(500).json({ message: "Internal Server Error" });
    }

    // Check if the user exists and has tasks
    if (results.length === 0) {
      return res.status(404).json({ message: "No tasks found for this user" });
    }
    // Return the tasks in the response
    return res.status(200).json(results);
  });
});

