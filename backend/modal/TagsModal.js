import mongoose from "mongoose";

const tagSchema = new mongoose.Schema({
  title: {
    type: String,
  },
  count : {
    type : Number,
    default: 1
  }
});

const TagList = mongoose.model("TagList", tagSchema);
export default TagList;
