var mongoose = require("mongoose");
var passportLocalMongoose = require("passport-local-mongoose");


var UserSchema = new mongoose.Schema({
    username: String,
    password: String,
    name: String,
    surname: String,
    email: String,
    role: { type: Number, min: 0, max: 3},
    game: {
        id:{
         type: mongoose.Schema.Types.ObjectId,
         ref: "Game"
      }
    }
});

UserSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", UserSchema);