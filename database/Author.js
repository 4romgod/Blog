const mongoose = require("mongoose");

const authorSchema = new mongoose.Schema(
  {
    name: String,
    email: String,
    bio: String
  }
);

const authorModel = mongoose.model("author", authorSchema);

module.exports = authorSchema;