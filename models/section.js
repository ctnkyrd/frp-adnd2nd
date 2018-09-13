var mongoose = require("mongoose");
 
var sectionSchema = new mongoose.Schema({
   name: String,
   startdate: Date,
   comments: [
    {
       type: mongoose.Schema.Types.ObjectId,
       ref: "Comment"
    }
 ]
});
 
module.exports = mongoose.model("Section", sectionSchema);