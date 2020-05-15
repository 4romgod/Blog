const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema(
  {
    author: String,
    email: String,
    date: String,
    body: String,
    blogTitle: String
  }
);

const CommentModel = mongoose.model("comment", commentSchema);

module.exports = CommentModel;