import mongoose from "mongoose";

const tagSchema = new mongoose.Schema({
  title: {
    type: String,
  }
});

const AdminTagList = mongoose.model("AdminTags", tagSchema);
export default AdminTagList;
