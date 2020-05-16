const express = require("express");
const router = express.Router();
const theDate = require("../util/date");

// MODELS
const Blog = require("../database/Blog.js");


// POSTING A COMMENT
router.post("/comment", function (req, res) {
    const authorName = req.body.name;
    const authorEmail = req.body.email;
    const theComment = req.body.comment;
    const blogTitle = req.body.blogTitle;
    console.log(blogTitle);

    const comment = {
        author: authorName,
        email: authorEmail,
        date: theDate,
        body: theComment,
    };

    Blog.updateOne({ title: blogTitle },
        {
            $push: { comments: comment }
        },
        function (error, success) {
            if (error) { console.log(error); }
            else { console.log(success); }
        }
    );

    //find better way to refresh page with comment rendered
    res.redirect("/blogs/" + blogTitle);
});


module.exports = router;
