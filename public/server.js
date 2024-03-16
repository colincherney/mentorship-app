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
app.use(express.static("public/html-pages"));

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
        res.redirect(`homepage.html`);
      } else {
        res.redirect(`login_error.html`);
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
        res.redirect(`index.html`);

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

// User Data Route
app.get("/user-data", (req, res) => {
  const user_id = req.session.user_id; // Retrieve user_id from session

  if (!user_id) {
    res.status(401).send("Unauthorized");
    return;
  }

  const db = createConnection(); // Create a new database connection

  db.connect((err) => {
    if (err) {
      console.error("Error connecting to MySQL:", err);
      res.status(500).send("Internal Server Error");
      return;
    }
    console.log("MySQL Connected...");

    db.query(
      "SELECT * FROM USERS_2 WHERE user_id = ?",
      [user_id],
      (error, results) => {
        if (error) {
          console.error("Error fetching data:", error);
          res.status(500).send("Internal Server Error");
          return;
        }
        res.json(results);
      }
    );

    db.end((err) => {
      if (err) {
        console.error("Error closing MySQL connection:", err);
        return;
      }
      console.log("MySQL Connection Closed...");
    });
  });
});

// Logout route
app.get("/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.error("Error destroying session:", err);
      res.status(500).send("Internal Server Error");
      return;
    }
    res.redirect("index.html"); // Redirect to the login page
  });
});

// Delete account route
app.post("/delete_account", (req, res) => {
  const user_id = req.session.user_id; // Retrieve user_id from session

  if (!user_id) {
    res.status(401).send("Unauthorized");
    return;
  }

  const db = createConnection(); // Create a new database connection

  db.connect((err) => {
    if (err) {
      console.error("Error connecting to MySQL:", err);
      res.status(500).send("Internal Server Error");
      return;
    }
    console.log("MySQL Connected...");

    db.query(
      "DELETE FROM USERS_2 WHERE user_id = ?",
      [user_id],
      (error, result) => {
        if (error) {
          console.error("Error deleting user:", error);
          res.status(500).send("Internal Server Error");
          return;
        }
        console.log("User deleted successfully");
        req.session.destroy(); // Destroy the session

        res.redirect("/index.html"); // Redirect to the index page

        db.end((err) => {
          if (err) {
            console.error("Error closing MySQL connection:", err);
            return;
          }
          console.log("MySQL Connection Closed...");
        });
      }
    );
  });
});

// Update User Data Route
app.post("/update-data", (req, res) => {
  const db = createConnection(); // Create a new database connection

  db.connect((err) => {
    if (err) {
      throw err;
    }
    console.log("MySQL Connected...");

    const user_id = req.session.user_id; // Retrieve user_id from session

    const { first_name, last_name, email, phone, job_title, location, about } =
      req.body;

    // Insert the form data into MySQL database
    const sql =
      "UPDATE USERS_2 SET first_name = ?, last_name = ?, email = ?, phone = ?, job_title = ?, location = ?, about = ? WHERE user_id = ?";
    db.query(
      sql,
      [
        first_name,
        last_name,
        email,
        phone,
        job_title,
        location,
        about,
        user_id,
      ],
      (err, result) => {
        if (err) {
          console.error("Error updating data:", err);
          res.status(500).send("Error occurred while updating data");
          return;
        }
        console.log("Data updated successfully");
        res.redirect(`profile.html`);

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
