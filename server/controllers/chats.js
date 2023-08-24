import Chat from "../models/chats.js";
import { io } from "../index.js";

export const createChat = async (req, res) => {
  console.log("create Chat");
  try {
    const { firstUser, secondUser, message } = req.body;
    let allUser = [firstUser, secondUser];
    allUser.sort();

    const chats = await Chat.findOne({
      bothUser: allUser[0] + " " + allUser[1],
    });
    if (!chats) {
      const newChat = new Chat({
        bothUser: allUser[0] + " " + allUser[1],
        chats: [],
      });
      await newChat.save();
    }

    res.status(201).json(chats);
  } catch (err) {
    res.status(409).json({ message: err.message });
  }
};

export const sendMessageController = async (firstUser, secondUser, message) => {
  console.log("send Message");
  try {
    const arrMessage = [secondUser, message];
    let allUser = [firstUser, secondUser];
    allUser.sort();
    const chats = await Chat.findOne({
      bothUser: allUser[0] + " " + allUser[1],
    });

    chats.chats.push(arrMessage);
    const updateMessage = await Chat.findOneAndUpdate(
      { bothUser: allUser[0] + " " + allUser[1] },
      { chats: chats.chats },
      { new: true }
    );

    return updateMessage;
  } catch (err) {
    throw new Error("Error sending message: " + err.message);
  }
};
