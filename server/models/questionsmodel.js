import mongoose from "mongoose";

const questionSchema = new mongoose.Schema(
  {
    question_name: {
      type: String,
      unique: true,
      required: [true, "Question Name is Required"],
    },
    question_difficulty: {
      type: String,
      enum: ["Hard", "Medium", "Easy"],
      default: "TBD",
    },
    question_solution: {
      type: String,
    },
    question_link: {
      type: [String],
      unique: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Questions", questionSchema);
