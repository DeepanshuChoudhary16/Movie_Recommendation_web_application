import mongoose from "mongoose";

const QuerySchema = new mongoose.Schema({
  user_input: {
    type: String,
    required: true
  },
  recommended_movies: {
    type: [String], 
    required: true
  },
  timestamp: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model("Query", QuerySchema);
