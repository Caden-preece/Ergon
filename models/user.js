"use strict";


//user schema start
const mongoose = require("mongoose"),
  { Schema } = mongoose;
  //passportLocalMongoose = require("passport-local-mongoose");
  

var userSchema = new Schema (
      {
        email: {
           type: String,
           
           lowercase: true,
           unique: true
         },
          password: {
            type: String,
            required: true 
            
          },
          accountType: {
              type: String,
              

          }
      },

  );

    userSchema.methods.getInfo = function() {
    return `email: ${this.email} password: ${this.password} accountType: ${this.accountType}`;
  };
  
  module.exports = mongoose.model("User", userSchema);

  //end user schema

  