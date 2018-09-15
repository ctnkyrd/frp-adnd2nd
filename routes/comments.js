var express = require("express");
var router = express.Router({mergeParams: true});
var Game = require("../models/game");
var Section = require("../models/section");
var middleware = require("../middleware");
var Comment = require("../models/comment");



//Comments Create
router.post("/",middleware.isLoggedIn, function(req, res){
    //lookup section using id
    req.body.comment.text = req.sanitize(req.body.comment.text);
    Section.findById(req.params.secion_id, function(err, section) {
       if(err){
           console.log(err);
       } else{
           Comment.create(req.body.comment, function(err, comment){
               if(err){
                   req.flash("error", "Something went wrong");
                   console.log(err);
               } else{
                   //add username and id to comment
                   comment.user.id = req.user._id;
                   comment.user.username = req.user.username;
                   //save comment
                   comment.save();
                   section.comments.push(comment);
                   section.save();
                   res.json(comment);
               }
           });
       }
    });
});

router.delete('/:comment_id', function(req, res){
    Comment.findByIdAndRemove(req.params.comment_id, function(err, comment){
        if(err){
            console.log(err);
        } else{
            res.json(comment);
        }
    });
});


module.exports = router;