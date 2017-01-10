var express = require("express"),
    app = express(),
    bodyParser = require("body-parser"),
    mongoose = require("mongoose"),
    Campground = require("./models/campground"),
    seedDB = require("./seeds");
    
seedDB();
mongoose.connect("mongodb://localhost/yelp_camp");
app.use(bodyParser.urlencoded({extended:true}));
app.set("view engine", "ejs");

// Campground.create({
//     name: "Beartooth Highway", 
//     image: "https://farm4.staticflickr.com/3742/10759552364_a796a5560a.jpg", 
//     description: "This is the best view in the world!"
//     }, function(err,campground){
//         if(err){
//             console.log(err);
//         } else {
//             console.log("New campground: ")
//             console.log(campground);
//         }
//     });


var campgrounds = [
        {name: "Salmon Creek", image: "https://farm2.staticflickr.com/1363/1342367857_2fd12531e7.jpg"},
        {name: "Beartooth Highway", image: "https://farm4.staticflickr.com/3742/10759552364_a796a5560a.jpg"},
        {name: "Bison's Meadows", image: "https://farm9.staticflickr.com/8161/7360193870_cc7945dfea.jpg"},
        {name: "Salmon Creek", image: "https://farm2.staticflickr.com/1363/1342367857_2fd12531e7.jpg"},
        {name: "Beartooth Highway", image: "https://farm4.staticflickr.com/3742/10759552364_a796a5560a.jpg"},
        {name: "Bison's Meadows", image: "https://farm9.staticflickr.com/8161/7360193870_cc7945dfea.jpg"},
        {name: "Salmon Creek", image: "https://farm2.staticflickr.com/1363/1342367857_2fd12531e7.jpg"},
        {name: "Beartooth Highway", image: "https://farm4.staticflickr.com/3742/10759552364_a796a5560a.jpg"},
        {name: "Bison's Meadows", image: "https://farm9.staticflickr.com/8161/7360193870_cc7945dfea.jpg"}
    ]

app.get("/", function(req, res){
    res.render("landing");
})

app.get("/campgrounds", function(req,res){
    //Get all campgrounds from DB
    Campground.find({}, function(err,allCampgrounds){
        if(err){
            console.log(err);
        } else {
            res.render("index", {campgrounds:allCampgrounds});
        }
    });
});

app.get("/campgrounds/new", function(req,res){
   res.render("new.ejs") 
});

//SHOW - shows more info about one campground
app.get("/campgrounds/:id", function(req,res){
    Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground){
        if (err){
            console.log(err);
        } else {
            console.log(foundCampground);
            res.render("show", {campground: foundCampground});
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

app.listen(process.env.PORT, process.env.IP, function(){
    console.log("The YelpCamp Server has Started!")
})