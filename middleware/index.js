var mongoose = require("mongoose");
var Games = require("../models/game");
var User = require("../models/user");
var Char = require("../models/character");

var middlewareObj = {};

middlewareObj.IsAdmin = function (req, res, next){
    if(req.isAuthenticated()){
        //otherwise, redirect
        User.findOne({'role':3}, function(err, foundUser){
           if(err) {
               res.redirect("back");
           } else {
               //the user is admin?
               if(foundUser.role === req.user.role){
                   next();
               } else{
                   req.flash("error", "Bunu Yapmaya Yetkiniz Yok");
                   res.redirect("back");
               }
           }
        });
    } else{
        req.flash("error", "Önce Giriş Yapmalısınız");
        res.redirect("back");
    }

}

middlewareObj.isSt = function (req, res, next){
    if(req.isAuthenticated()){
        //otherwise, redirect
        User.findById(req.user.id, function(err, foundUser){
           if(err) {
               res.redirect("back");
           } else {
               //the user is admin?
               if(foundUser.role >= 2){
                   next();
               } else{
                   req.flash("error", "Bunu Yapmaya Yetkiniz Yok");
                   res.redirect("back");
               }
           }
        });
    } else{
        req.flash("error", "Önce Giriş Yapmalısınız");
        res.redirect("back");
    }

}


middlewareObj.checkGameOwnership = function (req, res, next){
        if(req.isAuthenticated()){
            //otherwise, redirect
            Games.findById(req.params.id, function(err, foundGame){
               if(err) {
                   req.flash("error", "Oyun Bulunamadı");
                   res.redirect("back");
               } else {
                   //does the user owned the campground
                   if(foundGame.dm.id.equals(req.user._id)){
                       next();
                   } else{
                       req.flash("error", "Bunu Yapmaya Yetkiniz Yok");
                       res.redirect("back");
                   }
               }
            });
        } else{
            req.flash("error", "Önce Giriş Yapmanız Lazım");
            res.redirect("back");
        }
}


middlewareObj.checkCharOwnership = function(req, res, next){
    if(req.isAuthenticated()){
        Games.findById(req.params.id, function(err, foundGame){
            if(err){
                console.log(err);
            } else{
                if(foundGame.dm.id.equals(req.user._id)){
                    next();
                } else if(req.user._id.equals(req.params.char_id)){
                    next();
                }
            }
        });
    } else {
        req.flash("error", "Önce Giriş Yapmanız Lazım");
        res.redirect("back");
    }
}



middlewareObj.isLoggedIn = function (req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    req.flash("error", "Önce Giriş Yapmalısınız");
    res.redirect("/login");
}



module.exports = middlewareObj;