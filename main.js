"use strict";

const { findById } = require("./models/user");

//Import required libraries 
const express = require("express"),
  app = express(),
  router = express.Router(),
  layouts = require("express-ejs-layouts"),
  mongoose = require("mongoose"),
  methodOverride = require("method-override"),
  expressSession = require("express-session"),
  cookieParser = require("cookie-parser"),
  connectFlash = require("connect-flash"),
  expressValidator = require("express-validator"),
  passport = require("passport"),
  
//CONTROLLERS
  homeController = require("./controllers/homeController"),
  usersController = require("./controllers/usersController"),
  businessController = require("./controllers/businessController"),
  servicesController = require("./controllers/servicesController"),
  reviewController = require("./controllers/reviewController"),
//MODELS
  User = require("./models/user"),
  Business = require("./models/business");
  
//Connect to Atlas
  mongoose.connect(
    "mongodb+srv://cadenpreecE:caDen@cluster0.61xxy.mongodb.net/Freelance_DB?retryWrites=true&w=majority", //Atlas connection string here
     { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true }
   );
   
   const db = mongoose.connection;
   db.once("open", () => {
     console.log("Successfully connected to MongoDB using Mongoose!");
   });
   
   // App Settings
   app.set("port", process.env.PORT || 3000);
   app.set("view engine", "ejs");
   app.use(express.static("public"));
   app.use(layouts);
   app.use(express.urlencoded({ extended: false }));
   app.use(methodOverride("_method", {methods: ["POST", "GET"] }));
   app.use(express.json());
   app.use(cookieParser("secret_passcode"));
   app.use(
     expressSession({
       secret: "secret_passcode",
       cookie: {
         maxAge: 4000000
       },
       resave: false,
       saveUninitialized: false
     })
   );
   
   //Configure Passport
   app.use(passport.initialize());
   app.use(passport.session());
   passport.use(User.createStrategy());
   passport.serializeUser(User.serializeUser());
   passport.deserializeUser(User.deserializeUser());
   app.use(connectFlash());

// Middleware function to attach user and flash info to res.locals for easy access in views
app.use((req, res, next) => {
  res.locals.loggedIn = req.isAuthenticated();
  res.locals.currentUser = req.user;
  res.locals.flashMessages = req.flash();
  next();
});
// app.use((req, res, next) => {
//   currentBusiness = Business.findById(req.user.businessProfileId);
// });

//***** ROUTES ********
// Routes that show before Login
// Index, About, Services, Sign In
app.get("/", homeController.index),
app.get("/about", homeController.about),
app.get("/services", servicesController.getServices, homeController.searchServices),
app.get("/login", homeController.showSignIn),
app.get("/loginSignUp", homeController.signUpPage);
app.get("/users", usersController.index, usersController.indexView);

//begining services


//Show & Create Users
app.get("/signUp/signUp", homeController.signUpPage);
app.post("/users", usersController.create, usersController.redirectView);
app.delete("/users/:id/delete", usersController.delete, usersController.redirectView);
app.get("/users/:id/edit", usersController.edit);
app.put("/users/:id/update", usersController.update, usersController.redirectView);

//Show Login and actually Log in
app.get("/signUp/loginPage", homeController.showLogin);
app.post("/loginPage", usersController.authenticate);
app.get("/logout", usersController.logout,  usersController.redirectView);

//Show & Create Business Profile
app.get("/users/createBusinessProfile/:id",businessController.showUser, businessController.getCreatePage);
app.post("/users/createBusinessProfile", businessController.create, usersController.show, usersController.showView);


//Profile, Projects, invoices, inbox
app.get("/:id", usersController.show, businessController.showBusiness, usersController.showView);
app.get("/myProjects", homeController.showProjects);
app.get("/invoices", homeController.showInvoices);
app.get("/inbox", homeController.showInbox);

//Services Controller 

app.get("/services/construction", servicesController.index, servicesController.indexViewconstruction);
app.get("/services/electrical", servicesController.index, servicesController.indexViewelectrician);
app.get("/services/mechanics", servicesController.index, servicesController.indexViewmechanic);
app.get("/services/plumbing", servicesController.index, servicesController.indexViewplumbing);
app.get("/services/transportation", servicesController.index, servicesController.indexViewtransportation);

// View Biography/Review/Chat for each service
app.get("/services/construction/:id", reviewController.showBiography);
app.get("/services/construction/review/:id", reviewController.showReview);
app.get("/services/construction/chat/:id", reviewController.showChat);

app.get("/services/electrician/:id", reviewController.showBiography);
app.get("/services/electrician/review/:id", reviewController.showReview);
app.get("/services/electrician/chat:id", reviewController.showChat);

app.get("/services/mechanic/:id", reviewController.showBiography);
app.get("/services/mechanic/review/:id", reviewController.showReview);
app.get("/services/mechanic/chat/:id", reviewController.showChat);

app.get("/services/plumbing/:id", reviewController.showBiography);
app.get("/services/plumbing/review/:id", reviewController.showReview);
app.get("/services/plumbing/chat/:id", reviewController.showChat);

app.get("/services/transportation/:id", reviewController.showBiography);
app.get("/services/transportation/review/:id", reviewController.showReview);
app.get("/services/transportation/chat/:id", reviewController.showChat);

// ************ Launch server **************
  app.listen(app.get("port"), () => {
    console.log(`Server running at http://localhost:${app.get("port")}`);
  });