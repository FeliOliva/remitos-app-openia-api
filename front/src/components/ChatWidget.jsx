import React, { useState } from "react";
import { Button, Input, Spin, message as antMessage } from "antd";

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
          text: response.message || response.error,
        };
        setChatHistory((prevHistory) => [...prevHistory, botMessage]);
      }
    });

    setUserMessage("");
  };

  return (
    <div
      style={{
        position: "fixed",
        bottom: 16,
        right: 16,
        width: 300,
        padding: 16,
        borderRadius: 8,
        boxShadow: "0 0 8px rgba(0,0,0,0.1)",
        backgroundColor: "#fff",
        zIndex: 1000, // Asegura que el chat esté por encima de otros elementos
      }}
    >
      <div style={{ maxHeight: 300, overflowY: "auto", marginBottom: 8 }}>
        {chatHistory.map((msg, index) => (
          <div
            key={index}
            style={{ textAlign: msg.sender === "user" ? "right" : "left" }}
          >
            <p
              style={{
                margin: 0,
                padding: "4px 8px",
                backgroundColor: msg.sender === "user" ? "#e6f7ff" : "#f5f5f5",
                borderRadius: 4,
              }}
            >
              {msg.text}
            </p>
          </div>
        ))}
        {loading && (
          <div style={{ display: "flex", justifyContent: "center" }}>
            <Spin tip="Pensando..." />
          </div>
        )}
      </div>
      <Input
        placeholder="Escribe tu mensaje..."
        value={userMessage}
        onChange={(e) => setUserMessage(e.target.value)}
        onPressEnter={handleMessageSend}
        addonAfter={<Button onClick={handleMessageSend}>Enviar</Button>}
      />
    </div>
  );
};

export default ChatWidget;
