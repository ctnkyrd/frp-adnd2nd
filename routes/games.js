var express = require("express");
var router = express.Router();
var Game = require("../models/game");


//index route - show all games
router.get("/", function(req, res){
    Game.find({}, function(err, allGames){
        if(err){
            console.log(err);
        } else{
            res.render("games/index", {games: allGames, currentUser: req.user});
        }
    });
});

router.post("/", function(req, res){
   var name = req.body.name;
   var dmemail = req.body.email;
   var description = req.body.description;
   var dm = {
       id: req.user._id,
       username: req.user.username
   };
   var newGame = {name: name, email: dmemail, description: description, dm: dm};
   console.log(newGame);
});

router.get("/new", function(req, res){
   console.log(req.user);
   res.render("games/new");
});

module.exports = router;