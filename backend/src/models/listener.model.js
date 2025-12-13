import mongoose from "mongoose";

const listenerSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    age: { type: Number, required: true },
    dateOfJoining: { type: Date, default: Date.now },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    isOnline: { type: Boolean, default: false },
    role: { type: String, default: "Listener" },
    busyStatus: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export default mongoose.model("Listener", listenerSchema);