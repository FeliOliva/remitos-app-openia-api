import React, { useContext } from "react";
import { Select } from "antd";
import { DataContext } from "../context/DataContext";

const SelectClientes = ({ value, onChangeCliente, onInputChange }) => {
  const { clientes, fetchClientes } = useContext(DataContext);
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
      value: cliente.Cuenta_Corriente[0]?.id,
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
