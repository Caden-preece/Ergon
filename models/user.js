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
  
<<<<<<< HEAD:models/user.js
  module.exports = mongoose.model("User", userSchema);
=======
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
>>>>>>> 10f02f319a9d5cf2f41a5a9b968b4a354c84d308:models/users.js

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