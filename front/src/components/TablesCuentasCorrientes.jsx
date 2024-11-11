import React, { useContext, useState } from "react";
import SelectClientes from "./SelectClientes";
import { Modal, Button, Table, Row, Col } from "antd";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import dayjs from "dayjs";
import { DataContext } from "../context/DataContext";
import TablaEntregas from "./TablaEntregas";
import "../App.css";

const TablesCuentasCorrientes = () => {
  const [cliente, setCliente] = useState(null);
  const { remitos, fetchRemitos, entregas, fetchEntregas } =
    useContext(DataContext);

  const handleSelectedClient = () => {
    if (!cliente) {
      Modal.warning({
        title: "Advertencia",
        content: "Debe seleccionar un cliente con cuenta corriente",
        icon: <ExclamationCircleOutlined />,
      });
    } else {
      fetchRemitos(cliente);
      fetchEntregas(cliente);
    }
  };

  const handleClienteChange = (cliente) => {
    setCliente(cliente);
  };

  const columnsRemitos = [
    {
      title: "Fecha",
      dataIndex: "fecha",
      key: "fecha",
      render: (text) => dayjs(text).format("DD/MM/YYYY"),
    },
    {
      title: "Importe",
      dataIndex: "importe",
      key: "importe",
    },
    { title: "Saldo", dataIndex: "saldo", key: "saldo" },
    {
      title: "Estado",
      dataIndex: "estado",
      key: "estado",
      render: (text) => (text === 1 ? "No pagado" : "Pagado"),
    },
  ];

  return (
    <div style={{ padding: "16px" }}>
      <Row gutter={[16, 16]}>
        <Col xs={24} md={8}>
          <SelectClientes
            value={cliente}
            onChangeCliente={handleClienteChange}
            onInputChange={setCliente}
          />
        </Col>
        <Col xs={24} md={4}>
          <Button type="primary" onClick={handleSelectedClient} block>
            Buscar
          </Button>
        </Col>
        {remitos.length > 0 && (
          <Col xs={24}>
            <Table
              dataSource={remitos}
              columns={columnsRemitos}
              rowKey={(remito) => remito.id}
              pagination={{ pageSize: 5 }}
              scroll={{ x: "100%" }}
            />
          </Col>
        )}
        {entregas.length > 0 && (
          <Col xs={24}>
            <TablaEntregas entregas={entregas} />
          </Col>
        )}
      </Row>
    </div>
  );
};

export default TablesCuentasCorrientes;
