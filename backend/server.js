import express from "express";
import http from "http";

import { Server } from "socket.io";

const app = express();
const httpServer = http.createServer(app);
const PORT = 5003;
// io 기능 얹어주기
const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (client) => {
  console.log(`Client is connected`);
  client.on("disconnect", () => {
    console.log("Client is disconnected");
  });
  client.on("message", (messageInput) => {
    io.emit("message", messageInput);
  });
});

app.get("/", (req, res) => {
  res.status(200).json({ MESSAGE: "SERVER IS RUNNING" });
});

httpServer.listen(PORT, () => {
  console.log(`SERVER IS RUNNING in ${PORT}`);
});
