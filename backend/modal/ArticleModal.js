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
    createdAt: {
      type: Date,
      default: new Date(),
    },
  },
});

const Text = mongoose.model("Text", textSchema);
export default Text;
