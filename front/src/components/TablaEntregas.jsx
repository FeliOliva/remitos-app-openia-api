import React, { useEffect, useContext } from "react";
import { Table } from "antd";
import dayjs from "dayjs";
import { DataContext } from "../context/DataContext";

const TablaEntregas = ({ cuentaCorrienteId }) => {
  const { entregas, fetchEntregas } = useContext(DataContext);

  useEffect(() => {
    if (cuentaCorrienteId) {
      fetchEntregas(cuentaCorrienteId);
    }
  }, [cuentaCorrienteId, fetchEntregas]);

  const columns = [
    {
      title: "Fecha Última Modificación",
      dataIndex: "fechaUltimaModif",
      key: "fechaUltimaModif",
      render: (text) => dayjs(text).format("DD/MM/YYYY"),
    },
    {
      title: "Total",
      dataIndex: "total",
      key: "total",
    },
    {
      title: "Estado",
      dataIndex: "estado",
      key: "estado",
      render: (text) => (text === 1 ? "Activo" : "Inactivo"),
    },
  ];

  return (
    <Table
      dataSource={entregas}
      columns={columns}
      rowKey={(entrega) => entrega.id}
      pagination={{ pageSize: 5 }}
    />
  );
};

export default TablaEntregas;
