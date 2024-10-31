import React, { useState } from "react";
import axios from "axios";
import SelectClientes from "./SelectClientes";
import { Modal, Button, Table, Row, Col } from "antd";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import dayjs from "dayjs";

const TablesCuentasCorrientes = () => {
  const [cliente, setCliente] = useState(null);
  const [remitos, setRemitos] = useState([]);

  const handleSelectedClient = () => {
    if (!cliente) {
      Modal.warning({
        title: "Advertencia",
        content: "Debe seleccionar un cliente",
        icon: <ExclamationCircleOutlined />,
        timer: 3,
      });
    } else {
      fetchCuentasCorrientes(cliente);
    }
  };

  const handleClienteChange = (cliente) => {
    setCliente(cliente);
  };

  const fetchCuentasCorrientes = async (cliente_id) => {
    try {
      const response = await axios.get(
        `http://localhost:3001/api/cuentas_corrientes/cliente/${cliente_id}`
      );
      const cuentas_corrientes = response.data;
      fetchRemitos(cuentas_corrientes[0].id);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchRemitos = async (cuenta_corriente_id) => {
    console.log("cuenta corriente id", cuenta_corriente_id);
    try {
      const response = await axios.get(
        `http://localhost:3001/api/remito/cuenta_corriente/${cuenta_corriente_id}`
      );
      setRemitos(response.data);
    } catch (error) {
      console.log(error);
    }
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
