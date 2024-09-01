import React, { useEffect, useState } from "react";
import { io } from "socket.io-client";
import Cookies from 'js-cookie';
import './Chat.css'
import ScrollToBottom from "react-scroll-to-bottom";

//const socket = io.connect("http://localhost:3000"); 
const socket = io.connect("https://bookclub-6dmc.onrender.com"); 

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
      console.log("Message received:", msg); 
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
      const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      console.log(time);
      socket.emit("chatMessage", { username, message, time });
      setMessage(""); 
    }
  };

  return (
    <div className="chat-window">
      <div className="chat-header">
        <p>Book Discussion</p>
      </div>
      <div className="chat-body">
      <ScrollToBottom className="message-container">
        {messages.map((messageContent, index) => {
          return (
            <div
              key={index}
              className="message"
              id={username === messageContent.username ? "you" : "other"}
            >
              <div>
                <div className="message-content">
                  <p>{messageContent.message}</p>
                </div>
                <div className="message-meta">
                  <p id="time">{messageContent.time}</p>
                  <p id="author">{messageContent.username}</p>
                </div>
              </div>
            </div>
          );
        })}
        </ScrollToBottom>
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
