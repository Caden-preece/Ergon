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
      
      
      companyName: {
        type: String,

      },

      city: {
        type: String,

      },

      state: {
        type: String,
      },

      zipCode: {
        type: Number,
        max: 99999,
        min:10000,
      },
      service: {
        type: Array,

      },
      biography: {
        type: String,
      }

    }
);

  
module.exports = mongoose.model("Business", businessSchema, "businesses");