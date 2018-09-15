var express = require("express");
var router = express.Router();
var passport = require("passport");
var User = require("../models/user");
var middleware = require("../middleware");

//root route
router.get("/", function(req, res){
   res.render("landing");
});

//dashboard route
router.get("/dashboard",middleware.isLoggedIn, function(req, res){
   res.render("dashboard");
});

router.get("/login", function(req, res){
    if(req.isAuthenticated()){
        res.redirect("/dashboard");
    } else{
        res.render("login"); 
    }
});

router.post("/login", passport.authenticate("local", 
    {
    successRedirect: "/dashboard",
    failureRedirect: "/login"
    }), function(req, res){
    });

router.get("/logout", function(req, res) {
    req.logout();
    req.flash("success", "Çıkış Başarılı!");
    res.redirect("/");
});





module.exports = router;