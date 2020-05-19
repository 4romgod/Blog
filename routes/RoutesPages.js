const express = require("express");
const router = express.Router();
const _ = require("lodash");


const homeStartingContent = "Lacus vel facilisis volutpat est velit egestas dui id ornare. Semper auctor neque vitae tempus quam. Sit amet cursus sit amet dictum sit amet justo. Viverra tellus in hac habitasse. Imperdiet proin fermentum leo vel orci porta. Donec ultrices tincidunt arcu non sodales neque sodales ut. Mattis molestie a iaculis at erat pellentesque adipiscing. Magnis dis parturient montes nascetur ridiculus mus mauris vitae ultricies. Adipiscing elit ut aliquam purus sit amet luctus venenatis lectus. Ultrices vitae auctor eu augue ut lectus arcu bibendum at. Odio euismod lacinia at quis risus sed vulputate odio ut. Cursus mattis molestie a iaculis at erat pellentesque adipiscing.";
const aboutContent = "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.";
const contactContent = "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";


// GET THE HOME PAGE
router.get("/", function (req, res) {
    const heading = "Welcome to my Blog";
    const headingImg = "../images/boxing.jpg";

    res.render("home", { theContent: homeStartingContent, imgHeading: headingImg, theHeading: heading });
});


// GET THE ABOUT PAGE
router.get("/about", function (req, res) {
    const heading = "Ebenezer Mathebula";
    const headingImg = "../images/boxing.jpg";

    res.render("about", { theContent: aboutContent, imgHeading: headingImg, theHeading: heading });
});


// GET THE CONTACT PAGE
router.get("/contact", function (req, res) {
    const heading = "";
    const headingImg = "../images/contact-me.jpg";

    res.render("contact", { theContent: contactContent, imgHeading: headingImg, theHeading: heading });
});


// GET THE NEWSLETTER PAGE
router.get("/newsletter", function (req, res) {
    const heading = "Sign Up to my Newsletter";
    const headingImg = "../images/newsletter.jpg";

    res.render("newsletter/newsletter", { imgHeading: headingImg, theHeading: heading });
});


// GET PAGE TO COMPOSE A POST
router.get("/compose", function (req, res) {
    res.render("compose");
});


module.exports = router;
