var Games = require("../models/game");
var User = require("../models/user");

var middlewareObj = {};

middlewareObj.IsAdmin = function (req, res, next){
    if(req.isAuthenticated()){
        //otherwise, redirect
        User.findOne({'role':3}, function(err, foundUser){
           if(err) {
               res.redirect("back");
           } else {
               console.log(foundUser);
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



module.exports = middlewareObj;