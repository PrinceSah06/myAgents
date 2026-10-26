import mongoose from "mongoose";

const conversationSchema = new mongoose.Schema(
  {
    titel: { type: String, default: "new Chat" },
    userId: {
      type: String,
    },
  },
  { timestamps: true },
);

const Conversation = mongoose.model("Conversation", conversationSchema);
export default Conversation;
