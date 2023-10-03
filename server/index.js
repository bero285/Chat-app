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
import { sendMessage } from "./controllers/chats.js";
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


  })
  .catch((error) => {
    console.error("MongoDB connection error: ", error);
  });

io.on("connection", (socket) => {
  console.log("A user connected");

  socket.on("sendMessage", async (data) => {
    try {
      const { firstUser, secondUser, message } = data;

      const result = await sendMessage(
        firstUser,
        secondUser,
        message
      );

      io.emit("messageReceived", result);

    } catch (error) {
      console.error("Error processing sendMessage:", error);
    }
  });

  socket.on("disconnect", () => {
    console.log("A user disconnected");
  });
});

export { io };
