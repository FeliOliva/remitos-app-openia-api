import React, { useState } from "react";
import { Button, Input, Spin, message as antMessage } from "antd";
import "../App.css";

const ChatWidget = ({ onSendMessage }) => {
  const [userMessage, setUserMessage] = useState("");
  const [chatHistory, setChatHistory] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleMessageSend = async () => {
    if (!userMessage.trim()) return;

    // Agregar el mensaje del usuario a la historia del chat
    const newUserMessage = { sender: "user", text: userMessage };
    setChatHistory((prevHistory) => [...prevHistory, newUserMessage]);
    setLoading(true);

    // Llamar a la función de envío de mensajes
    onSendMessage(userMessage, (response) => {
      setLoading(false);
      if (response.error) {
        antMessage.error("Error: " + response.error);
      } else {
        // Agregar la respuesta del bot a la historia del chat
        const botMessage = {
          sender: "bot",
          text: response.message,
        };
        setChatHistory((prevHistory) => [...prevHistory, botMessage]);
      }
    });

    setUserMessage("");
  };

  return (
    <div className="chat-widget">
      <div className="chat-history">
        {chatHistory.map((msg, index) => (
          <div key={index} className={`chat-message ${msg.sender}`}>
            <p>{msg.text}</p>
          </div>
        ))}
        {loading && (
          <div className="chat-loading">
            <Spin tip="Pensando..." />
          </div>
        )}
      </div>
      <Input
        className="chat-input"
        placeholder="Escribe tu mensaje..."
        value={userMessage}
        onChange={(e) => setUserMessage(e.target.value)}
        onPressEnter={handleMessageSend}
        addonAfter={
          <Button type="primary" onClick={handleMessageSend}>
            Enviar
          </Button>
        }
      />
    </div>
  );
};

export default ChatWidget;
