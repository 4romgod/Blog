const express = require("express");
const router = express.Router();
const _ = require("lodash");


// GOLBAL VARIABLES

// The data. Will be replaced with database
let blogs = require("../data");

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