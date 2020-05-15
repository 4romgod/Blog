const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema({
    date: String,
    title: String,
    body: String,
    image: String,
    comments: []
    });
  
  const BlogModel = mongoose.model("blog", blogSchema);
  
  module.exports = BlogModel;