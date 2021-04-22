"use strict";

const {check, validationResult} = require("express-validator");
const User = require("../models/user");
const passport = require("passport");


const getUserParams = body => {
  return {
    email: body.email,
    accountType: body.accountType
  }; 
};

module.exports = {


  create: (req, res, next) => {
    if (req.skip) next();
    let newUser = new User(getUserParams(req.body));
    User.register(newUser, req.body.password, (e, user) => {
      if (user) {
        //req.flash("success", `${user.firstName}'s account created successfully!`);
        res.locals.redirect = "/signUp/loginPage";
        next();
      } else {
        //req.flash("error", `Failed to create user account because: ${e.message}.`);
        res.locals.redirect = "/signUp/signUp";
        console.log("failed");
        next();
      }
    });
  },


redirectView: (req, res, next) => {
    let redirectPath = res.locals.redirect;
    if (redirectPath !== undefined) res.redirect(redirectPath);
    else next()
    },

show: (req, res, next) => {
    let userId = req.params.id;
    User.findById(userId)
      .then(user => {
        res.locals.user = user;
        console.log("finished show")
        next();
      })
      .catch(error => {
        console.log(`Error fetching user by ID: ${error.message}`);
        next(error);
      });

  },

showView: (req, res) => {
  console.log("finished show view")
  res.render("profile");
},

index: (req, res, next) => {
    User.find()
        .then(user => {
        res.locals.user = user;
         next();
         })
        .catch(error => {
        console.log(`Error fetching users: ${error.message}`);
        next(error);
        })
    },

indexView: (req, res) => {
    res.render("users");
    },

    

delete: (req, res, next) => {
        let userId = req.params.id;
        User.findByIdAndRemove(userId)
          .then(() => {
            res.locals.redirect = "/users";
            next();
          })
          .catch(error => {
            console.log(`Error deleting user by ID: ${error.message}`);
            next();
          });
      },







edit: (req, res, next) => {
  let userId = req.params.id;
  User.findById(userId)
    .then(user => {
      res.render("signUp/edit", {
        user: user
      });
    })
    .catch(error => {
      console.log(`Error fetching user by ID: ${error.message}`);
      next(error);
    });
},

update: (req, res, next) => {
  let userId = req.params.id,
    userParams = getUserParams(req.body);

  User.findByIdAndUpdate(userId, {
    $set: userParams
  })
    .then(user => {
      res.locals.redirect = `/users`;
      res.locals.user = user;
      next();
    })
    .catch(error => {
      console.log(`Error updating user by ID: ${error.message}`);
      next(error);
    });
},

authenticate: passport.authenticate("local", {
  failureRedirect: "/loginPage",
  failureFlash: "Failed to login.",
  successRedirect: "/",
  successFlash: `Signed in as ${User.email} !`
}),

validate: async (req, res, next) => {                                    
  await check("email").normalizeEmail({
    }).trim().run(req);                                                     
  await check("email", "Email is invalid").isEmail().run(req);                                  
  await check("password", "Password cannot be empty").notEmpty().run(req); 

},

logout: (req, res, next) => {
  req.logout();
  res.locals.redirect = "/";
  next();
}
}


