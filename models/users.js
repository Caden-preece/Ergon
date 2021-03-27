"use strict";

const mongoose = require("mongoose"),
  { Schema } = mongoose;
  //passportLocalMongoose = require("passport-local-mongoose");
  

var usersSchema = new Schema (
      {
        email: {
           type: String,
           
           lowercase: true,
           unique: true
         },
          password: {
            type: String, 
            
          },
          accountType: {
              type: String,
              

          }
      },

  );

    usersSchema.methods.getInfo = function() {
    return `email: ${this.email} password: ${this.password} accountType: ${this.accountType}`;
  };
  
  module.exports = mongoose.model("Users", usersSchema);

  