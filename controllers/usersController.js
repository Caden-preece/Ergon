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
        res.locals.redirect = "/";
        next();
      } else {
        //req.flash("error", `Failed to create user account because: ${e.message}.`);
        res.locals.redirect = "/signup/signup";
        next();
      }
    });
  },

  // create: (req, res, next) => {
  //   let userParams = getUserParams(req.body);
  //   User.create(userParams)
  //     .then(user => {
  //       res.locals.redirect = "/users";
  //       res.locals.user = user;
  //       next();
  //     })
  //     .catch(error => {
  //       console.log(`Error saving user: ${error.message}`);
  //       next(error);
  //     });
  // },

redirectView: (req, res, next) => {
    let redirectPath = res.locals.redirect;
    if (redirectPath !== undefined) res.redirect(redirectPath);
    else next()
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

show: (req, res, next) => {
    let userId = req.params.id;
    Users.findById(userId)
        .then(user => {
        res.locals.user = user;
        next();
         })
        .catch(error => {
        console.log(`Error fetching user by ID: ${error.message}`);
        next(error);
         });
      },
    
showView: (req, res) => {
    res.render("users/show");
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

}


exports.saveUser = (req, res, next) => {          
    let newUser = new User({
      email: req.body.email,
      password: req.body.password,
      accountType: req.body.accountType
    });                                             
    newUser
    .save()
    .then(() => {         
      if (error) res.send(error);
      res.render("users");
    })
    .catch(error => {
        res.send(error);
      });
  };;
 

  