var mongoose = require("mongoose");
 
var sectionSchema = new mongoose.Schema({
   name: String
});
 
module.exports = mongoose.model("Section", sectionSchema);