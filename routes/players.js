var express = require("express");
var router = express.Router({mergeParams: true});
var Game = require("../models/game");
var User = require("../models/user");
var middleware = require("../middleware");

router.get("/", function(req, res){
    res.send("Heey Player Add");
});


//Player Create
router.post("/",middleware.isSt, function(req, res){
    Game.findById(req.params.id, function(err, foundGame) {
       if(err){
           console.log(err);
           res.redirect("/games");
       } else{
            var game = {
                id: foundGame._id
            };
            var newUser = new User({username: req.body.username, role: 1, game: game});
            User.register(newUser, req.body.password, function(err, user){
                if(err){
                    req.flash("error", err.message);
                    return res.redirect("/games/"+foundGame._id);
                }
                res.redirect("/games/"+foundGame._id);
            });
       }
    });
});

module.exports = router;