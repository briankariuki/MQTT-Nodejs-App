const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//Create Message Schema
const MessageSchema = new Schema({
  clientID: {
    type: String,
    required: true
  },
  userID: {
    type: String,
    required: true
  },
  File: {
    type: String,
    required: true
  },
  FileName: {
    type: String,
    required: true
  },
  Time: {
    type: Date,
    required: true
  }
});
const collectionName = "Hello";

module.exports = Hello = mongoose.model("Hello", MessageSchema, collectionName);
