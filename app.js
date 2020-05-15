//jshint esversion:6
require("dotenv").config();

// IMPORT SOME MODULES
const express = require("express");
const bodyParser = require("body-parser");
const https = require("https");
const ejs = require("ejs");
const mongoose = require("mongoose");
const nodemailer = require('nodemailer');


// SETUP EXPRESS 
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.set('view engine', 'ejs');


// MODELS
const Blog = require("./database/Blog.js");
const Comment = require("./database/Comment.js");

// SETUP DATABASE
mongoose.connect('mongodb://localhost:' + process.env.PORT + '/blogDB', { useNewUrlParser: true, useUnifiedTopology: true })
.then(()=> console.log("You are connected to MongoDB"))
.catch(()=> console.log("Connection error with MongoDB"));


// SET ROUTES
const pages = require("./routes/RoutesPages");
const blogsPages = require("./routes/RoutesBlogs");

app.use(pages);
app.use("/blogs", blogsPages);


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
    auth: "4romgod:" + process.env.API_KEY
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


// SEND A MESSAGE
app.post("/message", function (req, res) {
  const name = req.body.name;
  const email = req.body.email;
  const subject = req.body.subject;
  const message = req.body.message;
  
  const output = `
    <p>You have a new contact request</p>
    <h3>Contact details</h3>
    <ul>
      <li>Name: ${name}</li>
      <li>Email: ${email}</li>
      <li>Subject: ${subject}</li>
    </ul>
    <h3>Message</h3>
    <p>${message}</p>
  `

  // Use Smtp Protocol to send Email
  const smtpTransport = nodemailer.createTransport({
    service: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: "4romgod@gmail.com",
      pass: "AdonaiGodI$TheMa$ter365"
    }
  });

  const mailOptions = {
    from: "4romgod@gmail.com",
    to: "ebenezermathebula@gmail.com",
    subject: "Send Email Using Node.js",
    text: "Node.js New world for me",
    html: output
  }

  smtpTransport.sendMail(mailOptions, function (error, response) {
    if (error) {
      console.log(error);
    } 
    else {
      console.log("Message sent: " + response.message);
    }

    smtpTransport.close();
  });

});


// POSTING A COMMENT
app.post("/comment", function(req, res){
  const authorName = req.body.name;
  const authorEmail = req.body.email;
  const theComment = req.body.comment;
  const blogTitle = req.body.blogTitle;
  console.log(blogTitle);

  const comment = new Comment({
    author: authorName,
    email: authorEmail,
    date: "5/15/2025",
    body: theComment,
    blogTitle: blogTitle
  });

  comment.save();

  res.redirect("/blogs/"+blogTitle);

});


// START THE SERVER
app.listen(8888, function () {
  console.log("Server started on port 8888");
});
