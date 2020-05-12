//jshint esversion:6
require("dotenv").config();

// IMPORT SOME MODULES
const express = require("express");
const bodyParser = require("body-parser");
const https = require("https");
const ejs = require("ejs");

// SETUP EXPRESS 
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.set('view engine', 'ejs');


// set routes
const pages = require("./routes/pages.js");
const blogsPages = require("./routes/blogs.js");

app.use(pages);
app.use("/blogs", blogsPages);


// POSTING A JOURNAL
app.post("/compose", function (req, res) {
  const blog = {
    title: req.body.blogTitle,
    body: req.body.blogBody
  };
  blogs.push(blog);

  res.redirect("/blogs");
});


// POST OF SIGNIN DETAILS
app.post("/newsletter", function (req, res) {
  const fname = req.body.fname;
  const surname = req.body.surname;
  const email = req.body.email;

  const data = {
    members: [{
      email_address: email,
      status: "subscribed",
      merge_fields: {
        FNAME: fname, LNAME: surname
      }
    }]
  };
  const membersJson = JSON.stringify(data);

  const url = "https://us8.api.mailchimp.com/3.0/lists/21979571f7";

  const options = {
    method: "POST",
    auth: "4romgod:"+process.env.API_KEY
  }

  const requestApi = https.request(url, options, function (responseApi) {
    if (responseApi.statusCode === 200) {
      // get the data from the response
      responseApi.on("data", function (data) {
        const dataRes = JSON.parse(data);

        // the data has an error
        if (dataRes.errors.length > 0) {
          console.log("ERROR: " + dataRes.errors[0].error);
          res.render("newsletter/failure");
        }
        else {
          res.render("newsletter/success");
        }

      });

    }
    else {
      res.render("newsletter/failure");
    }

  });

  requestApi.write(membersJson);
  requestApi.end();

});

// POST RETRY SIGNUP
app.post("/retry", function (req, res) {
  res.redirect("/newsletter");
});



// START THE SERVER
app.listen(8888, function () {
  console.log("Server started on port 8888");
});
