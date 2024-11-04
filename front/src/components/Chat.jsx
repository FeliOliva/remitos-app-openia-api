import React, { useContext } from "react";
import axios from "axios";
import ChatWidget from "./ChatWidget";
import { DataContext } from "../context/DataContext";

const Chat = () => {
  const { fetchClientes, fetchRemitos, fetchEntregas } =
    useContext(DataContext);

  const handleSendMessage = async (message, callback) => {
    console.log("Message:", message);
    try {
      const response = await axios.post("http://localhost:3001/api/chat", {
        message,
      });
      console.log("Respuesta del backend:", response.data);

      // Llama a todas las funciones de fetch para actualizar los datos
      fetchClientes();
      fetchRemitos();
      fetchEntregas();

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
