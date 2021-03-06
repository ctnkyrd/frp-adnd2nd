var express = require("express");
var router = express.Router();
var Game = require("../models/game");
var Char = require("../models/character");
var middleware = require("../middleware");
var moment = require('moment');


//index route - show all games
router.get("/", middleware.isSt, function(req, res){
    Game.find({"dm.id": req.user._id}, function(err, allGames){
        if(err){
            console.log(err);
        } else{
            res.render("games/index", {games: allGames, currentUser: req.user});
        }
    });
});

router.post("/",middleware.isSt, function(req, res){
   var name = req.body.name;
   var dmemail = req.body.email;
   var gamestartdate = req.body.date;
   var description = req.body.description;
   var dm = {
       id: req.user._id,
       username: req.user.username
   };
   var newGame = {name: name, email: dmemail,gamestartdate: gamestartdate ,description: description, dm: dm};
   
   
   Game.create(newGame, function(err, newlycreated){
       if(err){
           console.log(err);
       } else{
           res.redirect("/games");
       }
    });
});

router.get("/new",middleware.isSt, function(req, res){
   res.render("games/new");
});


//destroy game route
router.delete("/:id", middleware.checkGameOwnership,function(req, res){
    Game.findByIdAndRemove(req.params.id, function(err){
       if(err){
           res.redirect("/games");
       } else{
           res.redirect("/games");
       }
    });
});


//show route
router.get("/:id",middleware.isLoggedIn, function(req, res) {
    Game.findById(req.params.id).populate("sections").populate("players").populate("characters").exec(function(err, foundGame){
        if(err){console.log(err)}
        else{
            if(req.xhr){
                res.json(foundGame);
            }
            else{
                res.render("games/show", {game: foundGame, moment: moment});
            }
        }
    });
   
});

module.exports = router;