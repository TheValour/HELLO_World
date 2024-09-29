import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  isAdmin : {
    type : Boolean,
    default : false
  },
  email: {
    type: String,
    required: [true, "Your email address is required"],
    unique: true,
  },
  username: {
    type: String,
    required: [true, "Your username is required"],
  },
  password: {
    type: String,
    required: [true, "Your password is required"],
  },
  articleList :{
    type: [Object],
    default: []
  },
  createdAt: {
    type: Date,
    default: new Date(),
  },
});

const User = mongoose.model("User", userSchema);
export default User;
