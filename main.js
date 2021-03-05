"use strict";
//Import required libraries 
const express = require("express"),
app = express(), 
layouts = require("express-ejs-layouts"),
homeController = require("./controllers/homeController");

// Import Mongoose to work with MongoDB 
//const mongoose = require("mongoose");

// Set application variables
app.set("view engine", "ejs"); // Use EJS
app.set("port", process.env.PORT || 3000); // Set port to PORT env variable or 3000
app.use(express.urlencoded({extended: false})); // Use built-in middleware to parse request body data from html forms (urlencoded)
app.use(express.json()); // Use built-in middleware to parse request body data in JSON format
app.use(layouts); // Tell the app that it should use express-ejs-layouts
app.use(express.static("public")); // Tell the app where to find static resources

//***** ROUTES ********
// Routes that show before Login
// Index, About, Services, Sign In
app.get("/", homeController.index),
app.get("/about", homeController.about),
app.get("/services", homeController.searchServices),
app.get("/login", homeController.showSignIn),
app.get("/loginSignUp", homeController.signUpPage);
//Routes that show after Login
//Profile, Projects, invoices, inbox
app.get("/profile", homeController.showProfile),
app.get("/myProjects", homeController.showProjects),
app.get("/invoices", homeController.showInvoices),
app.get("/inbox", homeController.showInbox);

//   app.get("/signin", homeController.signIn);
//   app.get("/clients", homeController.showClients);

// ************ Launch server **************
  app.listen(app.get("port"), () => {
    console.log(`Server running at http://localhost:${app.get("port")}`);
  });