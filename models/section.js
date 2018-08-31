var mongoose = require("mongoose");
 
var sectionSchema = new mongoose.Schema({
   name: String,
   description: String,
   startdatetime: Date,
   enddatetime: Date
});
 
module.exports = mongoose.model("Game", sectionSchema);