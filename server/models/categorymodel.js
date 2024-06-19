import mongoose from "mongoose";

const categorySchema = new mongoose.Schema(
  {
    category_name: {
      type: String,
      required: true,
      unique: true,
    },
    category_resources: {
      type: [String],
      required: true,
    },
    questions: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "Questions",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Categories", categorySchema);
