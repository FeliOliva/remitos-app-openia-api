import React from "react";
import axios from "axios";
import ChatWidget from "./ChatWidget";

const Chat = () => {
  const handleSendMessage = async (message, callback) => {
    console.log("Message:", message);
    try {
      const response = await axios.post("http://localhost:3001/api/chat", {
        message,
      });
      console.log("Respuesta del backend:", response.data);
      // Llama al callback con la respuesta del servidor
      callback(response.data);
    } catch (error) {
      console.error("Error enviando mensaje al backend:", error);
      callback({ error: error.message });
    }
  };

  return <ChatWidget onSendMessage={handleSendMessage} />;
};

export default Chat;
