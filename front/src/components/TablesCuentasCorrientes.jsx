import React, { useContext, useState } from "react";
import SelectClientes from "./SelectClientes";
import { Modal, Button, Table, Row, Col } from "antd";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import dayjs from "dayjs";
import { DataContext } from "../context/DataContext";

const TablesCuentasCorrientes = () => {
  const [cliente, setCliente] = useState(null);
  const { remitos, fetchRemitos } = useContext(DataContext);

  const handleSelectedClient = () => {
    console.log("Cliente seleccionado:", cliente);
    if (!cliente) {
      Modal.warning({
        title: "Advertencia",
        content: "Debe seleccionar un cliente con cuenta corriente",
        icon: <ExclamationCircleOutlined />,
      });
    } else {
      const cuentaCorrienteId = cliente;
      fetchRemitos(cuentaCorrienteId);
    }
  };
  const handleClienteChange = (cliente) => {
    setCliente(cliente);
  };

  const columns = [
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
              columns={columns}
              rowKey={(remito) => remito.id}
              pagination={{ pageSize: 5 }}
            />
          </Col>
        )}
      </Row>
    </div>
  );
};

export default TablesCuentasCorrientes;
