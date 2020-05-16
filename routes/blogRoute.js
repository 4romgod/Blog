const express = require("express");
const router = express.Router();
const _ = require("lodash");
const Blog = require("../database/Blog.js");
const fileUpload = require("express-fileupload");
const settings = require("../settings");
const theDate = require("../util/date");

router.use(fileUpload());

// GOLBAL VARIABLES

// SETUP DATA


// GET ALL BLOGS POSTS
router.get("/", function (req, res) {
    const heading = "Blog";
    const headingImg = "../images/typing.jpg";

    Blog.find(function(err, allBlogs){
        if(err){
            console.log(err);
            res.render("blogs", { theBlogs: [], imgHeading: headingImg, theHeading: heading });
        }
        else{
            let blogs = allBlogs;
            res.render("blogs", { theBlogs: blogs, imgHeading: headingImg, theHeading: heading });
        }
        
    });
});

// GET A SINGLE BLOG POST
router.get("/:blogName", function (req, res) {
    //const reqTitle = _.kebabCase(req.params.blogName);
    const reqTitle = (req.params.blogName);
    console.log("Requested Title: " + reqTitle);

    const heading = "";
    const headingImg = "";
    
    // GET THE REQ BLOG FROM MONGODB
    Blog.find({title: reqTitle}, function(err, blog){
        if(err){
            console.log("Blog Does not exits");
            res.render("blog", {theBlog: {date:"", title:"Blog not found", body:""} });
        }
        else if(blog){
            //headingImg = blog[0].image;

            res.render("blog", {
                theBlog: blog[0],
                theHeading: heading,
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


});


// POSTING A BLOG
router.post("/compose", function (req, res) {

    if(req.files){ 
        console.log("File Uploaded Successfully!");      

        let image = req.files.blogImage;
        const imageName = image.name;
        const imagePath = settings.PROJECT_ROOT+"/public/images/uploads/"+imageName;

        image.mv(imagePath, function(err){
            if(err){
                console.log("File couldnt be saved: ERROR: "+err)
            }
            else{
                console.log("File saved successfully");
                const blog = new Blog({
                    date: theDate,
                    title: req.body.blogTitle,
                    body: req.body.blogBody,
                    image: "../images/uploads/"+imageName
                  });
                  blog.save();

                  res.redirect("/blogs");
            }
        });
    }
    else{
        console.log("No Image File Uploaded");  
    }
  
    //res.redirect("/blogs");
});

module.exports = router;