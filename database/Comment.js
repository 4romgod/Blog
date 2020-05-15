const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
  author: String,
  date: String,
  body: String,
}
);

const CommentModel = mongoose.model("comment", commentSchema);

module.exports = CommentModel;