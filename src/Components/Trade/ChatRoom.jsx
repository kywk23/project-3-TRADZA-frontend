import { useState, useEffect } from "react";
import socketIO from "socket.io-client";
import { Link } from "react-router-dom";
import { useUserId } from "../Users/GetCurrentUser";
import axios from "axios";
import { BACKEND_URL } from "../../../constants";

const socket = socketIO.connect("http://localhost:3000/messageRoom");

export default function ChatRoom({ tradeId, currUser, currPartner }) {
  const [messages, setMessages] = useState([]);
  const [messageInput, setMessageInput] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const [stateChanged, setStateChanged] = useState(false);
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
  }, [tradeId, stateChanged]);

  const emitSocketMessage = async (e) => {
    e.preventDefault();

    if (messageInput) {
      const messageData = {
        senderId: userId,
        content: messageInput,
        tradeId: tradeId,
        timestamp: new Date(),
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
    setStateChanged(!stateChanged);
  };

  useEffect(() => {
    socket.on("messageResponse", (data) => {
      setMessages([...messages, data]);
    });
  }, [socket, messages]);

  useEffect(() => {
    socket.on("isTyping", (typing) => setIsTyping(typing));
  });

  return (
    <>
      <div className="mb-4 w-full" style={{ overflowY: "auto" }}>
        <div className="space-y-2">
          {messages.map((message, index) => (
            <>
              <div
                key={index}
                className={`p-1 m-1 rounded-lg ${
                  message.senderId === currUser.id
                    ? "bg-blue-100 text-right"
                    : "bg-green-100 text-left"
                }`}
              >
                {message.senderId == currUser.id ? (
                  <b className="font-semibold">{currUser.firstName}: </b>
                ) : (
                  <b className="font-semibold">{currPartner.firstName} : </b>
                )}
                <p>{message.content}</p>
              </div>
              <p className="m-1 mb-3 text-xs text-gray-500">
                {new Date(message.timestamp)
                  .toISOString()
                  .replace(/\.\d{3}Z$/, "")
                  .replace("T", " ")}
              </p>
            </>
          ))}
        </div>
      </div>
      <div>
        {isTyping ? (
          <p className="text-sm italic text-gray-600">Someone is typing...</p>
        ) : null}
        <form
          onSubmit={emitSocketMessage}
          className="flex items-center space-x-2"
        >
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
