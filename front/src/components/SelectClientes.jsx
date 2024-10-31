import React, { useEffect, useState } from "react";
import { Select } from "antd";
import axios from "axios";

const SelectClientes = ({ value, onChangeCliente, onInputChange }) => {
  const [clientes, setClientes] = useState([]);

  useEffect(() => {
    const fetchClientes = async () => {
      try {
        const response = await axios.get("http://localhost:3001/api/clients");
        setClientes(response.data);
      } catch (error) {
        console.error("Error fetching clientes:", error);
      }
    };

    fetchClientes();
  }, []);

  const handleSearchCliente = (value) => {
    console.log("search:", value);
  };

  const handleChangeCliente = (value) => {
    const selectedCliente = clientes.find((cliente) => cliente.id === value);
    onChangeCliente(selectedCliente);

    if (onInputChange) {
      onInputChange(value);
    }
  };

  const options = clientes
    .filter((cliente) => cliente.estado === 1)
    .map((cliente) => ({
      label: cliente.nombre + " " + cliente.apellido,
      value: cliente.id,
    }));

  return (
    <Select
      value={value}
      showSearch
      placeholder="Selecciona un cliente"
      onSearch={handleSearchCliente}
      options={options}
      optionFilterProp="label"
      onChange={handleChangeCliente}
      style={{ width: "100%" }}
    />
  );
};

export default SelectClientes;
