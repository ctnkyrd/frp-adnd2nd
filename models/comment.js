var mongoose = require("mongoose");
 
var commentSchema = new mongoose.Schema({
   text: String,
   created: {type: Date, default: Date.now},
   user:{
    id:{
       type: mongoose.Schema.Types.ObjectId,
       ref: "User"
    },
    username: String
 }
});
 
module.exports = mongoose.model("Comment", commentSchema);