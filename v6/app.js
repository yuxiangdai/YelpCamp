var express = require("express"),
    app = express(),
    bodyParser = require("body-parser"),
    mongoose = require("mongoose"),
    passport = require("passport"),
    LocalStrategy = require("passport-local"),
    Campground = require("./models/campground"),
    Comment = require("./models/comment"),
    User = require("./models/user")
    seedDB = require("./seeds");
    
mongoose.connect("mongodb://localhost/yelp_camp");
app.use(bodyParser.urlencoded({extended:true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
seedDB();

//Passport Configuration
app.use(require("express-session")({
    secret: "Expecto Patronum",
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.get("/", function(req, res){
    res.render("landing");
})

app.get("/campgrounds", function(req,res){
    //Get all campgrounds from DB
    Campground.find({}, function(err,allCampgrounds){
        if(err){
            console.log(err);
        } else {
            res.render("campgrounds/index", {campgrounds:allCampgrounds});
        }
    });
});

app.get("/campgrounds/new", function(req,res){
   res.render("campgrounds/new") 
});

//SHOW - shows more info about one campground
app.get("/campgrounds/:id", function(req,res){
    Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground){
        if (err){
            console.log(err);
        } else {
            console.log(foundCampground);
            res.render("campgrounds/show", {campground: foundCampground});
        }
        
    });
});

app.post("/campgrounds", function(req, res){
    var name = req.body.name
    var image = req.body.image
    var desc = req.body.description;
    var newCampground = {name: name, image: image, description:desc};
    //create a new campground and save to DB
    Campground.create(newCampground,function(err,newlyCreated){
        if(err){
            console.log(err);
        } else {
            //redirect back to /campgrounds
            res.redirect("/campgrounds");
        }
    });
});




//COMMENTS ROUTE
app.get("/campgrounds/:id/comments/new", function(req,res){
   Campground.findById(req.params.id, function(err,campground){
      if(err){
          console.log(err);
      } else {
          res.render("comments/new", {campground:campground});
      }
   });
});

app.post("/campgrounds/:id/comments", function(req,res){
   Campground.findById(req.params.id, function(err,campground){
      if(err){
          console.log(err);
          res.redirect("/campgrounds");
      } else {
        Comment.create(req.body.comment, function(err,comment){
            if(err){
                console.log(err);
            } else {
                campground.comments.push(comment);
                campground.save();
                res.redirect("/campgrounds/" + campground._id);
            }
        });
      }
   });
});

//Auth Routes
// show register form
app.get("/register", function(req,res){
    res.render("register");
});

//handle signup logic

app.listen(process.env.PORT, process.env.IP, function(){
    console.log("The YelpCamp Server has Started!")
})