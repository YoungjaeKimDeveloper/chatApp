import React, { useState, useEffect } from "react";
import { io } from "socket.io-client";
// TODO : SERVER HOSTING
const socket = io("http://localhost:5003");

const App = () => {
  const [messageInput, setMessageInput] = useState("");
  const [messages, setMessages] = useState([]);
  const sendMessage = (e) => {
    e.preventDefault();
    if (messageInput.trim() !== "") {
      socket.emit("message", messageInput);
      setMessageInput("");
    }
  };
  useEffect(() => {
    socket.on("message", (message) => {
      setMessages((prev) => [...prev, message]);
    });

    return () => {
      return socket.off("message");
    };
  }, []);

  // Socket Setting
  socket.on("connect", () => {
    console.log("CLIENT SIDE IS CONNECTTED");
  });

  return (
    <div>
      <h1>Chat App</h1>
      <form onSubmit={(e) => sendMessage(e)}>
        <input
          type="text"
          onChange={(e) => setMessageInput(e.target.value)}
          value={messageInput}
          placeholder="Write the message Please"
        />
        <button type="submit">Send</button>
      </form>
      <div>
        {messages.length !== 0 ? (
          messages.map((message, key) => <div key={key}>{message}</div>)
        ) : (
          <p>No Message</p>
        )}
      </div>
    </div>
  );
};

export default App;
