const express = require("express");
const router = express.Router();
const _ = require("lodash");


// GOLBAL VARIABLES

let blogs = [
    {
        title: "Just a Title",
        body: "proin fermentum leo vel orci porta. Donec ultrices tincidunt arcu non sodales neque sodales ut. Mattis molestie a iaculis at erat pellentesque adipiscing. Magnis dis parturient montes nascetur ridiculus mus mauris vitae ultricies. Adipiscing elit ut aliquam purus sit amet luctus venenatis lectus. Ultrices vitae auctor eu augue ut lectus arcu bibendum at. Odio euismod lacinia at quis risus sed vulputate odio ut. Cursus mattis molestie a iaculis at erat pellentesque adipiscing."
    }
];


// GET ALL PAGE
router.get("/", function (req, res) {
    res.render("blogs", { theBlogs: blogs, imgHeading: "../images/typing.jpg", theHeading: "Blog" });
});

// GET A SINGLE POST
router.get("/:blogName", function (req, res) {
    const reqTitle = _.lowerCase(req.params.blogName);

    blogs.forEach(function (blog) {
        const storedTitle = _.lowerCase(blog.title);

        if (reqTitle === storedTitle) {
            console.log("match found");

            res.render("blog", {
                theTitle: blog.title,
                theBody: blog.body
            }
            );
        }
        else ("match not found: " + req.params.blogName)

    });

});


module.exports = router;