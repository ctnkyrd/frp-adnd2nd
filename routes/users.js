var express = require("express");
var router = express.Router();
var User = require("../models/user");
var middleware = require("../middleware");


//index route - show all users
router.get("/", middleware.IsAdmin, function(req, res){
    User.find({}, function(err, allUsers){
        if(err){
            console.log(err);
        } else{
            res.render("users/index", {users: allUsers, currentUser: req.user});
        }
    });
});


module.exports = router;