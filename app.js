//jshint esversion:6
require("dotenv").config();

// IMPORT SOME MODULES
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");

// FLAG FOR THE DB CONNECTION
const con = require("./database/connection");


// SETUP EXPRESS 
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.set('view engine', 'ejs');


// SETUP DATABASE
mongoose.connect('mongodb://localhost:' + process.env.PORT + '/blogDB', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(function(){
    console.log(con);
    con.isConnected=true;
    console.log(con);
    console.log("You are connected to MongoDB");

  })
  .catch(function(){
    con.isConnected=false;
    console.log("Connection error with MongoDB")
  });
  

// REQUIRE ROUTES
const comment = require("./routes/commentRoute");
const messageMe = require("./routes/messageRoute");
const newsletter = require("./routes/newletterRoute");
const pages = require("./routes/RoutesPages");
const blog = require("./routes/blogRoute");

// USE ROUTES
app.use(pages);
app.use(comment);
app.use(messageMe);
app.use(newsletter);
app.use("/blogs", blog);


// 404 PAGE
app.use(function(req,res){

  console.log(res.statusCode);

  res.status(404).render("404");
});


// START THE SERVER
app.listen(8888, function () {
  console.log("Server started on port 8888");
});
