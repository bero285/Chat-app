import mongoose from "mongoose";
import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import chatRoutes from "./routes/chats.js";
import userRoutes from "./routes/users.js";
import loginRoutes from "./routes/login.js";
import http from "http";
import { Server } from "socket.io";
import { sendMessageController } from "./controllers/chats.js";
import Chat from "./models/chats.js";
dotenv.config();
const app = express();
app.use(cors());
app.use(bodyParser.json());

app.use("/login", loginRoutes);
app.use("/users", userRoutes);
app.use("/chats", chatRoutes);

const server = http.createServer(app);

const PORT = process.env.PORT || 6001;
const io = new Server(server);

mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    server.listen(3001, () => {
      console.log("Server is running on port 3001");
    });

    const changeStream = Chat.watch([], {
      fullDocument: "updateLookup",
    });

    changeStream.on("change", async (change) => {
      console.log("Something changed");

      io.sockets.sockets.forEach(async (socket) => {
        if (!socket.userData) {
          return;
        }

        const { firstUser, secondUser } = socket.userData;
       
        const allUser = [firstUser, secondUser];
        allUser.sort();
        if (
          change.operationType === "insert" &&
          change.fullDocument.bothUser === allUser[0] + " " + allUser[1]
        ) {
          socket.emit("messageReceived", change.fullDocument.chats);
        }

        if (change.operationType === "update") {
          const chatRoomId = change.documentKey._id;
          const updatedChatRoom = await Chat.findById(chatRoomId);

          if (
            updatedChatRoom &&
            updatedChatRoom.bothUser === allUser[0] + " " + allUser[1]
          ) {
            io.emit("messageReceived", [
              updatedChatRoom.chats,
              allUser[0],
              allUser[1],
            ]);
          }
        }
      });
    });
  })
  .catch((error) => {
    console.error("MongoDB connection error: ", error);
  });

io.on("connection", (socket) => {
  console.log("A user connected");

  socket.on("sendMessage", async (data) => {
    try {
      const { firstUser, secondUser, message } = data;

      const result = await sendMessageController(
        firstUser,
        secondUser,
        message
      );
    

      socket.userData = { firstUser, secondUser };
    } catch (error) {
      console.error("Error processing sendMessage:", error);
    }
  });

  socket.on("disconnect", () => {
    console.log("A user disconnected");
  });
});

export { io };
