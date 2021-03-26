"use strict";

const mongoose = require("mongoose"),
  { Schema } = require("mongoose"),
  //passportLocalMongoose = require("passport-local-mongoose");
  

  var usersSchema = new Schema (
      {
          email: {
            type: String,
            required: true,
            lowercase: true,
            unique: true
          },
          password: {
            type: String, 
            required: true
          },
          accountType: {
              type: String,
              required: true

          }
      },
      {
        timestamps: true
      }
  );

    usersSchema.methods.getInfo = function() {
    return `email: ${this.email} password: ${this.password} accountType: ${this.accountType}`;
  };
  
  module.exports = mongoose.model("Users", usersSchema);

  