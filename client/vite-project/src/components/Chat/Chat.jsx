import React, { useEffect, useState } from "react";
import { io } from "socket.io-client";
import Cookies from 'js-cookie';
import './Chat.css'

const socket = io.connect("http://localhost:3000"); 

const ChatRoom = () => {
  const [username, setUsername] = useState("");
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const storedUsername = Cookies.get('uname');
    if (storedUsername) {
      setUsername(storedUsername);
    }

    socket.on("chatMessage", (msg) => {
      setMessages((prevMessages) => [...prevMessages, msg]);
    });

    return () => {
      socket.off("chatMessage");
    };
  }, []);

  useEffect(() => {
    console.log('username', username); 
  }, [username]);

  const sendMessage = (e) => {
    e.preventDefault();
    if (message.trim()) {
      socket.emit("chatMessage", { username, message });
      setMessage(""); 
    }
  };

  return (
    <div className="chat-window">
      <div className="chat-header">
        <p>Live Chat</p>
      </div>
      <div className="chat-body">
        {messages.map((msg, index) => (
          <div key={index}>
            <strong>{msg.username}:</strong> {msg.message}
          </div>
        ))}
      </div>
      <form className="chat-footer" onSubmit={sendMessage}>
        <input
          type="text"
          value={message}
          placeholder="Hey..."
          onChange={(event) => setMessage(event.target.value)}
        />
        <button type="submit">&#9658;</button>
      </form>
    </div>
  );
};

export default ChatRoom;
