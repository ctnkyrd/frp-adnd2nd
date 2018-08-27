var mongoose = require("mongoose");
 
var charSchema = new mongoose.Schema({
   name: String,
   description: String,
   game: {
       id:{
           type: mongoose.Schema.Types.ObjectId,
           ref: "Game"
       }
   },
   user: {
       id:{
           type: mongoose.Schema.Types.ObjectId,
           ref: "User"
       },
       username: String
   },
   str: { type: Number, min: 0, max: 25},
   dex: { type: Number, min: 0, max: 25},
   con: { type: Number, min: 0, max: 25},
   int: { type: Number, min: 0, max: 25},
   wis: { type: Number, min: 0, max: 25},
   char: { type: Number, min: 0, max: 25},
   race: String,
   charclass: String,
   level: { type: Number, min: 0, max: 30},
   currentxp: Number
   
});
 
module.exports = mongoose.model("Char", charSchema);