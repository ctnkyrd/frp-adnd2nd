var express = require("express");
var router = express.Router({mergeParams: true});
var Char = require("../models/character");
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

router.put("/:char_id", middleware.checkCharOwnership, function(req, res){
    Char.findByIdAndUpdate(req.params.char_id, req.body.char, function(err, foundChar){
        if(err){
            console.log(err);
        } else {
            req.flash("success", "Karakter Bilgileri Güncellendi");
            res.redirect("/games/"+req.params.id+"/characters/"+foundChar._id);
        }
    });
});


module.exports = router;