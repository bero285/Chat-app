// const mongoose = require("mongoose");
import mongoose from "mongoose";
const chatSchema = new mongoose.Schema({
  bothUser: {
    type: String,
    required: true,
    min: 8,
    max: 100,
  },
  // firstUser: {
  //   type: any,
  //   required: true,
  //   min: 4,
  //   max: 50,
  // },
  // secondUser: {
  //   type: any,
  //   required: true,
  //   min: 4,
  //   max: 50,
  // },
  chats: {
    type: Array,
    default: [],
  },
});

const Chat = mongoose.model("Chat", chatSchema);

export default Chat;
