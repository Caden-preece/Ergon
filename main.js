"use strict";
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

//***** ROUTES ********
// Routes that show before Login
// Index, About, Services, Sign In
app.get("/", homeController.index),
app.get("/about", homeController.about),
app.get("/services", homeController.searchServices),
app.get("/login", homeController.showSignIn),
app.get("/loginSignUp", homeController.signUpPage);
app.get("/users", usersController.index, usersController.indexView);

//begining services
// app.get("/services/construction", homeController.showconstruction);
app.get("/services/electrician", homeController.showelectrician);
app.get("/services/mechanic", homeController.showmechanic);
app.get("/services/plumbing", homeController.showplumbing);
app.get("/services/transportation", homeController.showtransportation)



//Show & Create Users
app.get("/signUp/signUp", homeController.signUpPage);
app.post("/users", usersController.create, usersController.index, usersController.indexView);
app.delete("/users/:id/delete", usersController.delete, usersController.redirectView);
app.get("/users/:id/edit", usersController.edit);
app.put("/users/:id/update", usersController.update, usersController.redirectView);

//Show Login and actually Log in
app.get("/signUp/loginPage", homeController.showLogin);
app.post("/loginPage", usersController.authenticate);

//Show & Create Business Profile
app.get("/users/createBusinessProfile/:id",businessController.show, businessController.getCreatePage);
app.post("/users/createBusinessProfile", businessController.create, usersController.show, usersController.showView);;



// router.get("/users", usersController.index, usersController.indexView);
// router.get("/users/new", usersController.new);
// router.post("/users/create", usersController.validate, usersController.create, usersController.redirectView);
//Routes that show after Login
//Profile, Projects, invoices, inbox
app.get("/:id", usersController.show, usersController.showView);
app.get("/myProjects", homeController.showProjects);
app.get("/invoices", homeController.showInvoices);
app.get("/inbox", homeController.showInbox);

//services controller
app.get("/services/construction", servicesController.index, servicesController.indexView);

//   app.get("/signin", homeController.signIn);
//   app.get("/clients", homeController.showClients);

// ************ Launch server **************
  app.listen(app.get("port"), () => {
    console.log(`Server running at http://localhost:${app.get("port")}`);
  });