import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

export const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [clientes, setClientes] = useState([]);
  const [remitos, setRemitos] = useState([]);
  const [entregas, setEntregas] = useState([]);

  // Función para cargar clientes
  const fetchClientes = async () => {
    try {
      const response = await axios.get("http://localhost:3001/api/clients");
      setClientes(response.data);
    } catch (error) {
      console.error("Error fetching clientes:", error);
    }
  };

  // Función para cargar remitos utilizando el `cuentaCorrienteId` de cada cliente
  const fetchRemitos = async (cuentaCorrienteId) => {
    try {
      const response = await axios.get(
        `http://localhost:3001/api/remito/cuenta_corriente/${cuentaCorrienteId}`
      );
      setRemitos(response.data);
    } catch (error) {
      console.error("Error fetching remitos:", error);
    }
  };

  // Función para cargar entregas utilizando el `cuentaCorrienteId` de cada cliente
  const fetchEntregas = async (cuentaCorrienteId) => {
    try {
      const response = await axios.get(
        `http://localhost:3001/api/entregasxcuenta_corriente/${cuentaCorrienteId}`
      );
      setEntregas(response.data);
      console.log("Entregas:", response.data);
    } catch (error) {
      console.error("Error fetching entregas:", error);
    }
  };

  // Cargar clientes al inicio
  useEffect(() => {
    fetchClientes();
  }, []);

  return (
    <DataContext.Provider
      value={{
        clientes,
        remitos,
        entregas,
        fetchClientes,
        fetchRemitos,
        fetchEntregas,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};
