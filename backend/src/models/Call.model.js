import mongoose from "mongoose";

const callSchema = new mongoose.Schema(
  {
    caller: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    receiver: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    callType: { type: String, enum: ["audio", "video"], required: true },
    status: { type: String, enum: ["ongoing", "ended", "missed"], default: "ongoing" },
    duration: { type: Number, default: 0 }, // Call duration in seconds
  },
  { timestamps: true }
);

export default mongoose.model("Call", callSchema);
