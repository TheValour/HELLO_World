import mongoose from "mongoose";

const boxSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "title is required"],
  },
  description: {
    type: String,
    required: [true, "desc is required"],
  },
  artLength: {
    type: String,
  },
  image: {
    type: String,
  },
  likes: {
    type: Number,
  },
  tags: {
    type: [String],
    required: [true, "Your tags is required"],
  },
  username: {
    type: String,
    required: [true, "username is required"],
  },
});

const BoxPage = mongoose.model("BoxPage", boxSchema);
export default BoxPage;
