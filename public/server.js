const express = require("express");
const mysql = require("mysql");
const bodyParser = require("body-parser");
const session = require("express-session");

const app = express();
const path = require("path");

// Database connection configuration
const dbConfig = {
  host: "107.180.1.16",
  user: "spring2024Cteam13",
  password: "spring2024Cteam13",
  database: "spring2024Cteam13",
};

// Function to create a new database connection
function createConnection() {
  return mysql.createConnection(dbConfig);
}

// Middleware to parse incoming request bodies
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Session middleware
app.use(
  session({
    secret: "mentorship-app12345",
    resave: false,
    saveUninitialized: true,
  })
);

// Serve static files
app.use(express.static("public"));

// Login route
app.post("/login", (req, res) => {
  const db = createConnection(); // Create a new database connection

  db.connect((err) => {
    if (err) {
      throw err;
    }
    console.log("MySQL Connected...");

    const { email, password } = req.body;
    const sql = `SELECT user_id FROM USERS_2 WHERE email = ? AND password = ?`;

    db.query(sql, [email, password], (err, result) => {
      if (err) {
        console.error("Error executing query:", err);
        res.status(500).send("Internal Server Error");
        return;
      }

      if (result.length > 0) {
        const user_id = result[0].user_id;
        req.session.user_id = user_id; // Store user_id in session
        res.redirect(`html-pages/homepage.html`);
      } else {
        res.sendFile(path.join(__dirname, "html-pages/login_error.html"));
      }

      db.end((err) => {
        if (err) {
          throw err;
        }
        console.log("MySQL Connection Closed...");
      });
    });
  });
});

// Signup route
app.post("/signup", (req, res) => {
  const db = createConnection(); // Create a new database connection

  db.connect((err) => {
    if (err) {
      throw err;
    }
    console.log("MySQL Connected...");

    const { first_name, last_name, email, password, phone, job_title } =
      req.body;

    // Insert the form data into MySQL database
    const sql =
      "INSERT INTO USERS_2 (first_name, last_name, email, password, phone, job_title) VALUES (?, ?, ?, ?, ?, ?)";
    db.query(
      sql,
      [first_name, last_name, email, password, phone, job_title],
      (err, result) => {
        if (err) {
          console.error("Error inserting data:", err);
          res.status(500).send("Error occurred while signing up");
          return;
        }
        console.log("Data inserted successfully");
        res.redirect(`../index.html`);

        db.end((err) => {
          if (err) {
            throw err;
          }
          console.log("MySQL Connection Closed...");
        });
      }
    );
  });
});

// Start server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
