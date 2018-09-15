var express = require("express");
var router = express.Router({mergeParams: true});
var Game = require("../models/game");
var Section = require("../models/section");
var middleware = require("../middleware");


//Sections Create
router.post("/",middleware.checkGameOwnership, function(req, res){
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
                   req.flash("success", "Successfully added section");
                   res.redirect("/games/" + game._id);
               }
           });
       }
    });
});

router.get("/", middleware.isLoggedIn, function(req, res){
    Section.find({}, function(err, sections){
        if(err){
          console.log(err);
        } else {
            res.json(sections);
        }
      })
});

//show route
router.get("/:section_id",middleware.isLoggedIn, function(req, res) {
    Section.findById(req.params.section_id).populate("comments").exec(function(err, foundSection){
        if(err){console.log(err)}
        else{
            res.json({foundSection: foundSection, currentUser: req.user});
        }
    });
   
});

module.exports = router;