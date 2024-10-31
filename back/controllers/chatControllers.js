const chatService = require("../services/chatServices");
const axios = require("axios");

const getMessaged = async (req, res) => {
    const { message } = req.body;

    if (!message) {
        return res.status(400).json({ error: "Message is required" });
    }
    console.log("message:", message);

    try {
        const parsedMessage = await chatService.getMessaged(message);
        console.log("parsedMessage:", parsedMessage); // Verificar el JSON devuelto

        if (!parsedMessage || !parsedMessage.action || !parsedMessage.data) {
            return res.status(400).json({ error: "Formato de respuesta incorrecto" });
        }

        switch (parsedMessage.action) {
            case "agregar_cliente":
                if (!parsedMessage.data.nombre) {
                    return res.status(400).json({ error: "Nombre es requerido" });
                }
                console.log(parsedMessage.data.nombre);
                try {
                    const clienteResponse = await axios.post("http://localhost:3001/api/clients", {
                        nombre: parsedMessage.data.nombre,
                        apellido: parsedMessage.data.apellido || "",
                    });
                    responseMessage = `Cliente agregado con éxito:\nNombre: ${parsedMessage.data.nombre}\nApellido: ${parsedMessage.data.apellido}`;
                } catch (error) {
                    console.log(error);
                    res.status(500).json({ error: error.message });
                }
                break;

            case "agregar_remito":
                const { importe, fecha, nombreCliente, apellidoCliente } = parsedMessage.data;
                console.log("data:", parsedMessage.data);
                if (!importe || !fecha || !nombreCliente || !apellidoCliente) {
                    return res.status(400).json({ error: "Importe, fecha, nombreCliente y apellidoCliente son requeridos" });
                }

                try {
                    // 1. Obtener ID de cliente
                    const clienteResponse = await axios.get(
                        `http://localhost:3001/api/search?nombre=${nombreCliente}&apellido=${apellidoCliente}`
                    );
                    const cliente = clienteResponse.data;
                    const clienteId = cliente[0].id;

                    // 2. Obtener cuenta corriente del cliente
                    const cuentaCorrienteResponse = await axios.get(
                        `http://localhost:3001/api/cuentas_corrientes/cliente/${clienteId}`
                    );

                    const cuentaCorriente = cuentaCorrienteResponse.data[0];
                    console.log("cuentaCorriente:", cuentaCorriente);
                    const cuentaCorrienteId = cuentaCorriente.id;
                    console.log("cuentaCorrienteId:", cuentaCorrienteId);
                    console.log("importe", importe);
                    console.log("fecha", fecha);
                    console.log("cuentaCorrienteId", cuentaCorrienteId);

                    // 3. Agregar remito
                    const remitoResponse = await axios.post("http://localhost:3001/api/remito", {
                        importe: parseInt(importe),
                        fecha: fecha,
                        cuentaCorrienteId: parseInt(cuentaCorrienteId),
                    });
                    console.log("remitoResponse:", remitoResponse);

                    responseMessage = `Remito agregado con éxito:\nImporte: ${importe}\nFecha: ${fecha}`;
                } catch (error) {
                    console.log(error);
                    res.status(500).json({ error: error.message });
                }
                break;

            default:
                res.status(400).json({ error: "Acción no reconocida" });
                break;
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Error interno del servidor" });
    }
};


module.exports = {
    getMessaged,
};
