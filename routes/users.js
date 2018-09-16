var express = require("express");
var router = express.Router({
    mergeParams: true
});
var User = require("../models/user");
var middleware = require("../middleware");
var Game = require("../models/game");
var Char = require("../models/character");


//index route - show all users
router.get("/", middleware.IsAdmin, function (req, res) {
    User.find({
        role: {
            $lt: 3
        }
    }, function (err, allUsers) {
        if (err) {
            console.log(err);
        } else {
            res.render("users/index", {
                users: allUsers,
                currentUser: req.user
            });
        }
    });
});

//handle signup logic
router.post("/", function (req, res) {
    var newUser = new User({
        username: req.body.username,
        role: req.body.role
    });
    User.register(newUser, req.body.password, function (err, user) {
        if (err) {
            req.flash("error", err.message);
            return res.redirect("/users");
        }
        res.redirect("/users");
    })
});


//add player to game route also creates the character basic game id and user id
router.post("/:id", function (req, res) {
    var newUser = new User({
        username: req.body.user.username,
        role: 1,
        game: {
            id: req.params.id
        }
    });
    Game.findById(req.params.id, function (err, foundGame) {
        if (err) {
            console.log(err);
        } else {
            User.register(newUser, req.body.user.password, function (err, user) {
                if (err) {
                    req.flash("error", err.message);
                    return res.redirect("/games/" + foundGame._id);
                } else {
                    Char.create({
                        user: {
                            id: newUser._id,
                            username: newUser.username
                        },
                        game: {
                            id: foundGame._id
                        }
                    }, function (err, newChar) {
                        if (err) {
                            console.log(err);
                            req.flash("error", err.message);
                        } else {
                            foundGame.players.push(user);
                            foundGame.characters.push(newChar);
                            foundGame.save();
                            user.character.id = newChar._id;
                            user.save();
                            res.json({
                                user: user,
                                char: newChar
                            });
                        }
                    });

                }
            });
        }
    });
});


//destroy user route
router.delete("/:id", middleware.IsAdmin, function (req, res) {
    User.findByIdAndRemove(req.params.id, function (err, user) {
        if (err) {
            res.redirect("/users");
        } else {
            Char.findOneAndRemove({
                "user.id": user._id
            }, function (err) {
                if (err) {
                    console.log(err);
                } else {
                    if (req.xhr) {
                        res.json(user);
                    } else {
                        res.redirect("/users");
                    }
                }
            });

        }
    });
});

//Edit user route
router.put("/:id", middleware.IsAdmin, function (req, res) {
    User.findByIdAndUpdate(req.params.id, req.body.user, function (err, updatedUser) {
        if (err) {
            console.log(err);
        } else {
            res.redirect("/users/");
        }
    });
});

module.exports = router;