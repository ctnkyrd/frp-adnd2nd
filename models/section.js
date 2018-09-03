var mongoose = require("mongoose");
 
var sectionSchema = new mongoose.Schema({
   name: String,
   startdate: Date
});
 
module.exports = mongoose.model("Section", sectionSchema);