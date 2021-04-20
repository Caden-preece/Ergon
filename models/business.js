"use strict";


const mongoose = require("mongoose"),
  { Schema } = mongoose;

//begin buisness schema


var businessSchema = new Schema (
    {
    email: {
      type: String,
      lowercase: true,
      unique: true,

      },
      accountType: {
        type: String
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


businessSchema.methods.getInfo = function() {
  return `email: ${this.email} password: ${this.password} accountType: ${this.accountType} location: ${this.location} name: ${this.name} service: ${this.service}`;
};
  
module.exports = mongoose.model("Business", businessSchema);