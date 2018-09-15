var express = require("express");
var router = express.Router({mergeParams: true});
var Char = require("../models/character");
var Game = require("../models/game");
var middleware = require("../middleware");


router.get("/:char_id", middleware.checkCharOwnership, function(req, res){
    res.send("Selamlar Beyler!!");
});


module.exports = router;