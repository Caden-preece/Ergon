"use strict";

const mongoose = require("mongoose"),
  { Schema } = require("mongoose"),
  //passportLocalMongoose = require("passport-local-mongoose");
  

  var userSchema = new Schema (
      {
          email: {
            type: String,
            required: true,
            lowercase: true,
            unique: true
          }
      }
  )

  