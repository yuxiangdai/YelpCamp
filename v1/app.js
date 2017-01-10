var express = require("express");
var app = express();
var bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({extended:true}));
app.set("view engine", "ejs");

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
    res.render("campgrounds",{campgrounds:campgrounds});
});

app.get("/campgrounds/new", function(req,res){
   res.render("new.ejs") 
});

app.post("/campgrounds", function(req, res){
    var name = req.body.name
    var image = req.body.image
    var newCampground = {name: name, image: image};
    campgrounds.push(newCampground);
    res.redirect("/campgrounds");
})

app.listen(process.env.PORT, process.env.IP, function(){
    console.log("The YelpCamp Server has Started!")
})