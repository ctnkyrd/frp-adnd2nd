var mongoose = require("mongoose");
 
var gameSchema = new mongoose.Schema({
   name: String,
   image: String,
   description: String,
   dm:{
      id:{
         type: mongoose.Schema.Types.ObjectId,
         ref: "User"
      },
      username: String
   },
   players: [
      {
         type: mongoose.Schema.Types.ObjectId,
         ref: "User"
      }
   ], 
   sections: [
      {
         type: mongoose.Schema.Types.ObjectId,
         ref: "Section"
      }
   ],
   gamestartdate: Date,
});
 
module.exports = mongoose.model("Game", gameSchema);