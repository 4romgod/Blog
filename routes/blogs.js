const express = require("express");
const router = express.Router();
const _ = require("lodash");
const mongoose = require("mongoose");
const Blog = require("../database/Blog.js");


// GOLBAL VARIABLES

// SETUP DATA


// GET ALL PAGE
router.get("/", function (req, res) {
    Blog.find(function(err, allBlogs){
        if(err){
            console.log(err);
            res.render("blogs", { theBlogs: [], imgHeading: "../images/typing.jpg", theHeading: "Blog" });
        }
        else{
            let blogs = allBlogs;
            res.render("blogs", { theBlogs: blogs, imgHeading: "../images/typing.jpg", theHeading: "Blog" });
        }
        
    });
});

// GET A SINGLE POST
router.get("/:blogName", function (req, res) {
   //const reqTitle = _.lowerCase(req.params.blogName);
    const reqTitle = (req.params.blogName);
    
    // GET THE REQ BLOG FROM MONGODB
    Blog.find({title: reqTitle}, function(err, blog){
        if(err){
            console.log("Blog Does not exits");
        }
        else{
            console.log(blog);
            res.render("blog", {
                theBlog: blog[0]
            });
        }
    });

    /*blogs.forEach(function (blog) {
        const storedTitle = _.lowerCase(blog.title);

        if (reqTitle === storedTitle) {
            console.log("match found");

            res.render("blog", {
                theBlog: blog
            }
            );
        }
        else ("match not found: " + req.params.blogName)

    });*/

});


module.exports = router;