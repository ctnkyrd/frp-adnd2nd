var express = require("express");
var router = express.Router();
var passport = require("passport");
var User = require("../models/user");

//root route
router.get("/", function(req, res){
   res.render("landing");
});

router.get("/login", function(req, res){
    res.render("login");    
});

router.post("/login", passport.authenticate("local", 
    {
    successRedirect: "/games",
    failureRedirect: "/login"
    }), function(req, res){
        console.log(req.username);
    });

router.get("/logout", function(req, res) {
    req.logout();
    req.flash("success", "Çıkış Başarılı!");
    res.redirect("/campgrounds");
});

module.exports = router;