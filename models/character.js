var mongoose = require("mongoose");

const items = ["Yemek/İçecek", "Büyülü Nesne", "Elbise", "Büyü Malzemesi"];
var itemSchema = new mongoose.Schema({
    name: String,
    type: {type: String, enum: items},
    description: String,
    quantity: String
});

const classes = ["Fighter", "Wizard", "Thief", "Priest", "Paladin", "Druid"];
var charSchema = new mongoose.Schema({
   name: String,
   surname: String,
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
   items: [itemSchema],
   str: { type: Number, min: 0, max: 25},
   dex: { type: Number, min: 0, max: 25},
   con: { type: Number, min: 0, max: 25},
   int: { type: Number, min: 0, max: 25},
   wis: { type: Number, min: 0, max: 25},
   char: { type: Number, min: 0, max: 25},
   race: String,
   charclass: {type: String, enum: classes},
   level: { type: Number, min: 0, max: 30},
   currentxp: Number
});
 
module.exports = mongoose.model("Char", charSchema);