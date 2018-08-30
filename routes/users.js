var express = require("express");
var router = express.Router();
var User = require("../models/user");
var middleware = require("../middleware");


//index route - show all users
router.get("/", middleware.IsAdmin, function(req, res){
    User.find({role: {$lt: 3} }, function(err, allUsers){
        if(err){
            console.log(err);
        } else{
            res.render("users/index", {users: allUsers, currentUser: req.user});
        }
    });
});

//handle signup logic
router.post("/", function(req, res) {
   var newUser = new User({username: req.body.username, role: req.body.role});
   User.register(newUser, req.body.password, function(err, user){
       if(err){
           req.flash("error", err.message);
           return res.redirect("/users");
       }
       res.redirect("/users");
   })
});


//destroy user route
router.delete("/:id", middleware.IsAdmin,function(req, res){
    User.findByIdAndRemove(req.params.id, function(err){
       if(err){
           res.redirect("/users");
       } else{
           res.redirect("/users");
       }
    });
});

//Edit user route
router.put("/:id", middleware.IsAdmin,function(req, res){
    User.findByIdAndUpdate(req.params.id, req.body.user, function(err, updatedUser){
       if(err){
           console.log(err);
       } else {
           res.redirect("/users/");
       }
   });
});

module.exports = router;