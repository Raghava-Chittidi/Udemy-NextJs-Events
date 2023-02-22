import mongoose from "mongoose";

const Schema = mongoose.Schema;
const commentSchema = new Schema({
  email: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  text: {
    type: String,
    required: true,
  },
  eventId: {
    type: String,
    required: true,
  },
});

export default mongoose.models.Comments ||
  mongoose.model("Comments", commentSchema);
