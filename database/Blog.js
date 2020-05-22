const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema({
  author: {
    name: String,
    email: String,
    bio: String
  },
  date: String,
  title: String,
  body: String,
  image: String,

  comments: [{
    author: String,
    email: String,
    date: String,
    body: String
  }]

});

const BlogModel = mongoose.model("blog", blogSchema);

module.exports = BlogModel;