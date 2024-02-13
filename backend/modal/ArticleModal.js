import mongoose from "mongoose";

const textSchema = new mongoose.Schema({
  user: {
    email:{
      type: String,
      required: [true, "Your email address is required"],
    },
    username: {
      type: String,
      required: [true, "Your username is required"],
    },
  },
  article: {
    quill:{
      type: String,
      required: [true, "Required"],

    },
    title:{
      type: String,
      required: [true, "title is Required"],
    },
    image:{
      type: String,
    },
    tags: {
      type: [String],
      required: [true, "Article tag is required"],
    },
    createdAt: {
      type: Date,
      default: new Date(),
    },
  },
});

const Text = mongoose.model("Text", textSchema);
export default Text;
