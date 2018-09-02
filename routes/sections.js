var express = require("express");
var router = express.Router({mergeParams: true});
var Game = require("../models/game");
var Section = require("../models/section");
var middleware = require("../middleware");


//Sections Create
router.post("/",middleware.isLoggedIn, function(req, res){
    Game.findById(req.params.id, function(err, game) {
       if(err){
           console.log(err);
           res.redirect("/games");
       } else{
           Section.create(req.body.section, function(err, section){
               if(err){
                   req.flash("error", "Something went wrong");
                   console.log(err);
               } else{
                   section.save();
                   game.sections.push(section);
                   game.save();
                   console.log(section);
                   req.flash("success", "Successfully added section");
                   res.redirect("/games/" + game._id);
               }
           });
       }
    });
});


module.exports = router;