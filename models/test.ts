import mongoose from "mongoose";

const testSchema = new mongoose.Schema(
  {
    message: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Test = mongoose.models.Test || mongoose.model("Test", testSchema);

export default Test;