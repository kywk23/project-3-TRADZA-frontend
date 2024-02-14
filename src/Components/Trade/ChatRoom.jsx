import { useState, useEffect } from "react";
import socketIO from "socket.io-client";
import { Link } from "react-router-dom";
import { useUserId } from "../Users/GetCurrentUser";
import axios from "axios";
import { BACKEND_URL } from "../../../constants";

const socket = socketIO.connect("http://localhost:3000/messageRoom");

export default function ChatRoom({ tradeId }) {
  const [messages, setMessages] = useState([]);
  const [username, setUsername] = useState("");
  const [messageInput, setMessageInput] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const { currentUser } = useUserId();
  const userId = currentUser.id;

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await axios.get(`${BACKEND_URL}/messages/${tradeId}`);
        setMessages(response.data.messages);
      } catch (error) {
        console.error("Failed to fetch messages:", error);
      }
    };

    fetchMessages();
  }, [tradeId]);

  const emitSocketMessage = async (e) => {
    e.preventDefault();

    if (messageInput) {
      const messageData = {
        username: userId,
        text: messageInput,
        tradeId: tradeId,
      };

      try {
        await axios.post(`${BACKEND_URL}/messages`, messageData);
        socket.emit("message", messageData);
      } catch (error) {
        console.error("Failed to save message:", error);
      }
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
      <div className="mb-4" style={{ overflowY: "auto" }}>
        <div className="space-y-2">
          {messages.map((message, index) => (
            <div key={index} className="bg-gray-100 p-2 rounded-lg">
              <b className="font-semibold">{message.senderId} sent:</b>
              <p>{message.content}</p>
              <p className="text-xs text-gray-500">{message.timestamp}</p>
            </div>
          ))}
        </div>
      </div>
      <div>
        {isTyping ? <p className="text-sm italic text-gray-600">Someone is typing...</p> : null}
        <form onSubmit={emitSocketMessage} className="flex items-center space-x-2">
          <input
            type="text"
            placeholder="message"
            value={messageInput}
            onChange={(e) => {
              socket.emit("typing", true);
              setMessageInput(e.target.value);
            }}
            className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
          />
          <input
            type="submit"
            value="Send"
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 cursor-pointer"
          />
        </form>
      </div>
    </>
  );
}
