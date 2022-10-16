//Dependencies
const http = require("http");
const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const sqlite3 = require("sqlite3").verbose();

//Middleware
const app = express();
app.use(express.static("."));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//Database
let db = new sqlite3.Database(":memory:", (err) => {
  if (err) {
    return console.error(err.message);
  }
  console.log("Connected to the in-memory SQlite database.");
});

db.serialize(function () {
  db.run("CREATE TABLE user (username TEXT, password TEXT, title TEXT)");
  db.run("INSERT INTO user VALUES ('exampleUser', 'password', 'Admin')");
});

//Routes
app.get("/", (req, res) => {
  res.sendFile("index.html");
});

app.post("/login", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  const query =
    "SELECT title FROM user WHERE username = '" +
    username +
    "' AND password = '" +
    password +
    "'";
  console.log("username: " + username);
  console.log("password: " + password);
  console.log("query: " + query);

  db.get(query, function (err, row) {
    if (err) {
      console.log("ERROR", err);
      res.redirect("/index.html#error");
    } else if (!row) {
      res.redirect("/index.html#unauthorized");
    } else {
      res.send(
        "Hello <b>" +
          row.title +
          '!</b><br /> This file contains all your secret data: <br /><br /> SECRETS <br /><br /> MORE SECRETS <br /><br /> <a href="/index.html">Go back to login</a>'
      );
    }
  });
});

app.listen(3000);

// const sqlite3 = require("sqlite3").verbose();
// const http = require("http"),
//   path = require("path"),
//   express = require("express"),
//   bodyParser = require("body-parser");

// const app = express();
// app.use(express.static("."));
// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(bodyParser.json());

// const db = new sqlite3.Database(":memory:");
// db.serialize(function () {
//   db.run("CREATE TABLE user (username TEXT, password TEXT, title TEXT)");
//   db.run("INSERT INTO user VALUES ('exampleUser', 'password', 'Admin')");
// });

// app.get("/", function (req, res) {
//   res.sendFile("index.html");
// });

// app.post("/login", function (req, res) {
//   var username = req.body.username;
//   var password = req.body.password;
//   var query =
//     "SELECT title FROM user where username = '" +
//     username +
//     "' and password = '" +
//     password +
//     "'";

//   console.log("username: " + username);
//   console.log("password: " + password);
//   console.log("query: " + query);

//   db.get(query, function (err, row) {
//     if (err) {
//       console.log("ERROR", err);
//       res.redirect("/index.html#error");
//     } else if (!row) {
//       res.redirect("/index.html#unauthorized");
//     } else {
//       res.send(
//         "Hello <b>" +
//           row.title +
//           '!</b><br /> This file contains all your secret data: <br /><br /> SECRETS <br /><br /> MORE SECRETS <br /><br /> <a href="/index.html">Go back to login</a>'
//       );
//     }
//   });
// });

// app.listen(3000);
