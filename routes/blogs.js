const express = require("express");
const router = express.Router();
const _ = require("lodash");
const mongoose = require("mongoose");
const Blog = require("../database/Blog.js");
const fileUpload = require("express-fileupload");
const settings = require("../settings");

router.use(fileUpload());

// GOLBAL VARIABLES

// SETUP DATA


// GET ALL BLOGS POSTS
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

// GET A SINGLE BLOG POST
router.get("/:blogName", function (req, res) {
   //const reqTitle = _.lowerCase(req.params.blogName);
    const reqTitle = (req.params.blogName);
    console.log("Requested Title: " + reqTitle);
    
    // GET THE REQ BLOG FROM MONGODB
    Blog.find({title: reqTitle}, function(err, blog){
        if(err){
            console.log("Blog Does not exits");
            res.render("blog", {
                theBlog: {date:"", title:"Blog not found", body:""}
            });
        }
        else if(blog){
            res.render("blog", {
                theBlog: blog[0],
                theHeading: "",
                imgHeading: blog[0].image
                }
            );
        }
        else{
            res.render("blog", {
                theBlog: {date:"", title:"Blog not found", body:""}
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


// POSTING A BLOG
router.post("/compose", function (req, res) {
    const date = require("../util/date");

    if(req.files){ 
        console.log("File Uploaded Successfully!");      

        let image = req.files.blogImage;
        const imageName = image.name;
        const imagePath = settings.PROJECT_ROOT+"/public/images/"+imageName;

        image.mv(imagePath, function(err){
            if(err){
                console.log("File couldnt be saved: ERROR: "+err)
            }
            else{
                console.log("File saved successfully");
                const blog = new Blog({
                    date: date.getDate(),
                    title: req.body.blogTitle,
                    body: req.body.blogBody,
                    image: "../images/"+imageName
                  });
                  blog.save();
            }
        });
    }
    else{
        console.log("No Image File Uploaded");  
    }
  
    //res.redirect("/blogs");
  });
  

module.exports = router;