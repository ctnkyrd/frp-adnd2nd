var express = require("express");
var router = express.Router({mergeParams: true});
var Char = require("../models/character");
var Game = require("../models/game");
var middleware = require("../middleware");


router.get("/:char_id", middleware.checkCharOwnership, function(req, res){
    Char.findById(req.params.char_id, function(err, foundChar){
        if(err){
            console.log(err);
        } else{
            res.render("characters/show", {char: foundChar});
        }
    })
});


module.exports = router;