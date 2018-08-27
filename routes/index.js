var express = require("express");
var router = express.Router();

//root route
router.get("/", function(req, res){
   res.render("landing");
});

router.get("/login", function(req, res){
    res.render("login");    
});

module.exports = router;