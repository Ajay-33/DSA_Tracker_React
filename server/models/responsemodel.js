import mongoose from "mongoose";

const responseSchema = new mongoose.Schema(
  {
    CreatedBy: {
      type: mongoose.Types.ObjectId,
      ref: "User",
    },
    Question_id: {
      type: mongoose.Types.ObjectId,
      ref: "Questions",
    },
    Question_Status: {
      type: String,
      enum: ["Completed", "Revisit", "Pending"],
    },
    Question_Notes: {
      type: String,
    },
    // BookMark:{
    //     type:Boolean
    // }
  },
  { timestamps: true }
);

export default mongoose.model("Response", responseSchema);
