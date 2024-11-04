import React, { useContext, useState } from "react";
import SelectClientes from "./SelectClientes";
import { Modal, Button, Table, Row, Col } from "antd";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import dayjs from "dayjs";
import { DataContext } from "../context/DataContext";
import TablaEntregas from "./TablaEntregas";

const TablesCuentasCorrientes = () => {
  const [cliente, setCliente] = useState(null);
  const { remitos, fetchRemitos } = useContext(DataContext);

  const handleSelectedClient = () => {
    if (!cliente) {
      Modal.warning({
        title: "Advertencia",
        content: "Debe seleccionar un cliente con cuenta corriente",
        icon: <ExclamationCircleOutlined />,
      });
    } else {
      fetchRemitos(cliente);
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
    {
      title: "Saldo",
      dataIndex: "saldo",
      key: "saldo",
    },
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
        <Col span={24} md={8}>
          <SelectClientes
            value={cliente}
            onChangeCliente={handleClienteChange}
            onInputChange={setCliente}
          />
        </Col>
        <Col span={24} md={4}>
          <Button type="primary" onClick={handleSelectedClient} block>
            Buscar
          </Button>
        </Col>
        {remitos.length > 0 && (
          <Col span={24}>
            <Table
              dataSource={remitos}
              columns={columnsRemitos}
              rowKey={(remito) => remito.id}
              pagination={{ pageSize: 5 }}
            />
          </Col>
        )}
        {cliente && (
          <Col span={24}>
            <h3>Entregas del Cliente</h3>
            <TablaEntregas cuentaCorrienteId={cliente} />
          </Col>
        )}
      </Row>
    </div>
  );
};

export default TablesCuentasCorrientes;
