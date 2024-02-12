import { useState, useEffect } from "react";
import socketIO from "socket.io-client";
import { Link } from "react-router-dom";
import { useUserId } from "../Users/GetCurrentUser";

const socket = socketIO.connect("http://localhost:3000/messageRoom");
export default function ChatRoom() {
  const [messages, setMessages] = useState([]);
  const [username, setUsername] = useState("");
  const [messageInput, setMessageInput] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const { currentUser } = useUserId();
  const userId = currentUser.id;

  const emitSocketMessage = (e) => {
    e.preventDefault();

    if (messageInput) {
      socket.emit("message", {
        username: userId,
        text: messageInput,
        date: new Date(),
      });
    }

    socket.emit("typing", false);
    setMessageInput("");
  };

  useEffect(() => {
    socket.on("messageResponse", (data) => setMessages([...messages, data]));
  }, [socket, messages]);

  useEffect(() => {
    socket.on("isTyping", (typing) => setIsTyping(typing));
  });

  return (
    <>
      <div>
        <h2>Chatroom</h2>

        {messages.map((message, index) => (
          <div key={index}>
            <b>{message.username} sent:</b>
            <p>{message.text}</p>
            <p>{message.date}</p>
          </div>
        ))}
      </div>
      <div>
        {isTyping ? <p>Someone is typing...</p> : null}
        <form onSubmit={emitSocketMessage}>
          <input
            type="text"
            placeholder="message"
            value={messageInput}
            onChange={(e) => {
              socket.emit("typing", true);
              setMessageInput(e.target.value);
            }}
          />
          <input type="submit" value="Send" />
        </form>
      </div>
    </>
  );
}
