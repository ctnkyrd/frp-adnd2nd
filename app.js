var express           = require("express"),
    app               = express(),
    bodyParser        = require("body-parser"),
    mongoose          = require("mongoose"),
    flash             = require("connect-flash"),
    passport          = require("passport"),
    LocalStrategy     = require("passport-local"),
    User              = require("./models/user"),
    Game              = require("./models/game"),
    Char              = require("./models/character"),
    expressSanitizer  = require("express-sanitizer"),
    methodOverride    = require("method-override");
    
//requiring routes
var indexRoutes       = require("./routes/index"),
    gameRoutes        = require("./routes/games"),
    userRoutes        = require("./routes/users"),
    commentRoutes     = require("./routes/comments"),
    sectionRoutes     = require("./routes/sections"),
    playerRoutes      = require("./routes/players");
    
var dbUrl = process.env.DBCONNECTION || "mongodb://localhost/frpv1";
mongoose.connect(dbUrl, { useNewUrlParser: true });

app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));
app.use(expressSanitizer());
app.use(flash());

// PASSPORT CONFIGURATION
app.use(require("express-session")({
    secret: "once again rusty wins cutest dog!",
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req, res, next){
   res.locals.currentUser = req.user;
   res.locals.error = req.flash("error");
   res.locals.success = req.flash("success");
   next();
});

app.use("/", indexRoutes);
app.use("/games", gameRoutes);
app.use("/users", userRoutes);
app.use("/games/:id/sections", sectionRoutes);
app.use("/games/:id/sections/:secion_id/comments", commentRoutes);
app.use("/games/:id/players", playerRoutes);


addAdmin();
function addAdmin(){
    var newUser = new User({username: "Admin", role:3});
   User.register(newUser, "12345", function(err, user){
       if(err){
           console.log(err.message);
       } else {
           console.log("Admin Created!");
       }
});
}


app.listen(process.env.PORT || 3000, process.env.IP || 'localhost', function(){
   console.log("The frpApp Server Started!");
});

// app.listen(process.env.PORT, process.env.IP, function(){
//     console.log("The frpApp Server Started!");
//  });