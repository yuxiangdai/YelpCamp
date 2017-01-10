var mongoose = require('mongoose');
var Campground = require('./models/campground');
var Comment = require('./models/comment')

var data = [
    {
        name: "Cloud's Rest",
        image: "https://farm8.staticflickr.com/7252/7626464792_3e68c2a6a5.jpg",
        description: "Blah blah"
    },
    {
        name: "Desert Mesa",
        image: "https://farm4.staticflickr.com/3872/14435096036_39db8f04bc.jpg",
        description: "Blah blah"
    },
    {
        name: "Canyon Floor",
        image: "https://farm3.staticflickr.com/2311/2123340163_af7cba3be7.jpg",
        description: "Blah blah"
    }
]
function seedDB() {
    //Remove all campgrounds
    Campground.remove({}, function(err){
        if(err){
            console.log(err)
        } 
        console.log('removed campgrounds');
        // add a few campgrounds
        data.forEach(function(seed){
            Campground.create(seed, function(err, campground){
                if(err){
                    console.log(err)
                } else {
                    console.log("added a campground!");
                    //create a comment
                    Comment.create({
                        text: "This place is great!",
                        author: "Homer"
                    }, function(err,comment){
                        if(err){
                            console.log(err);
                        }
                        else {
                            campground.comments.push(comment);
                            campground.save();
                            console.log("Created new comment")
                        }
                    });
                }
            });
        });
    });
    
    
}

module.exports = seedDB;