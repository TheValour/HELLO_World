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
  _id: {
    type:  Object,
    required: [true, "Id is required"],
  },
  image: {
    type: String,
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
