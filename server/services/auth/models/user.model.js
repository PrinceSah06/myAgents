import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: String,
    email: String,
    avatar: String,
    firebaseUid: { type: String, unique: true },
  },
  { timestamps: true },
);



const User = mongoose.model("User",userSchema)

export default User;