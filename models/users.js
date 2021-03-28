"use strict";


//user schema start
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
  //end user schema

  //begin buisness schema


  var buisnessSchema = new Schema (
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

      },
      location: {
        type: String,

      },
      name: {
        type: String,

      },
      service: {
        type: String,

      },

    },
  );

  buisnessSchema.methods.getInfo = function() {
    return `email: ${this.email} password: ${this.password} accountType: ${this.accountType} location: ${this.location} name: ${this.name} service: ${this.service}`;
  };
  
  module.exports = mongoose.model("Users", usersSchema);