"use strict";


//user schema start
const mongoose = require("mongoose"),
  { Schema } = mongoose;
const passportLocalMongoose = require("passport-local-mongoose");
  

var userSchema = new Schema (
      {
    email: {
        type: String,
        
        lowercase: true,
        unique: true
      }, 
        
      accountType: {
          type: String,
          

      }, 
      isAdmin: {
        type: Boolean,
        default: false
      }

      }

  );

  userSchema.plugin(passportLocalMongoose, {
    usernameField: "email"
  });

  
  module.exports = mongoose.model("User", userSchema, "users");

  //end user schema

  
