import mongoose from "mongoose";
import validator from "validator";
import shortId from "shortid";

const shortUrlSchema = new mongoose.Schema({
  fullUrl: {
    type: String,
    required: [true, "please provide an url"],
    validate: {
      validator: validator.isURL,
      message: "please provide a valid url",
    },
  },

  shortUrl: {
    type: String,
    required: true,
    default: shortId.generate,
  },

  clicks: {
    type: Number,
    required: true,
    default: 0,
  },

  user: {
    type: mongoose.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

export default mongoose.model("ShortUrl", shortUrlSchema);
