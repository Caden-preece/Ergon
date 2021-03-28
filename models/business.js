"use strict";


const mongoose = require("mongoose"),
  { Schema } = mongoose;

//begin buisness schema


var busisnessSchema = new Schema (
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

    }
);


busisnessSchema.methods.getInfo = function() {
  return `email: ${this.email} password: ${this.password} accountType: ${this.accountType} location: ${this.location} name: ${this.name} service: ${this.service}`;
};
  
module.exports = mongoose.model("Business", businessSchema);