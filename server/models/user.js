// const mongoose = require("mongoose");
import mongoose from "mongoose";
const userSchema = new mongoose.Schema({
  userName: {
    type: String,
    required: true,
    min: 4,
    max: 50,
  },
});

const User = mongoose.model("chatuser",userSchema)

export default User;