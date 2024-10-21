const detallesEntregaService = require('../services/detalleEntregaServices');

const getAllDetalles = async (req, res) => {
    try {
        const detallesEntrega = await detallesEntregaService.getAllDetalles();
        res.status(200).send(detallesEntrega);
    } catch (error) {
        res.status(500).send(error);
    }
};

const getDetalleEntregaByID = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) {
            return res.status(400).json({ error: "ID es requerido" });
        }
        const detalleEntrega = await detallesEntregaService.getDetalleEntregaByID(id);
        res.json(detalleEntrega);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Error al obtener el detalle de entrega' });
    }
};

const addDetalleEntrega = async (req, res) => {
    try {
        const { importe, fecha, entregaId } = req.body;
        if (!importe || !fecha || !entregaId) {
            res.status(400).json('Todos los campos son obligatorios');
        }
        const newDetalle = await detallesEntregaService.addDetalleEntrega({ importe, fecha, entregaId });
        res.json(newDetalle);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Error al agregar el detalle de entrega' });
    }
}

const dropDetalleEntrega = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) {
            return res.status(400).json({ error: "ID es requerido" });
        }
        const detalleEntrega = await detallesEntregaService.getDetalleEntregaByID(id);
        if (!detalleEntrega) {
            return res.status(404).json({ error: "Detalle de entrega no encontrado" });
        }
        await detallesEntregaService.updateEntregaStatus(id, 0);
        res.json(detalleEntrega);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Error al eliminar el detalle de entrega' });
    }
}

const upDetalleEntrega = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) {
            return res.status(400).json({ error: "ID es requerido" });
        }
        const detalleEntrega = await detallesEntregaService.getDetalleEntregaByID(id);
        if (!detalleEntrega) {
            return res.status(404).json({ error: "Entrega de entrega no encontrado" });
        }
        await detallesEntregaService.updateEntregaStatus(id, 1);
        res.json(detalleEntrega);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Error al actualizar el detalle de entrega' });
    }
}

const updateDetalleEntrega = async (req, res) => {
    try {
        const { id } = req.params;
        const { importe, fecha } = req.body;
        if (!id) {
            return res.status(400).json({ error: "ID es requerido" });
        }
        const detalleEntrega = await detallesEntregaService.getDetalleEntregaByID(id);
        if (!detalleEntrega) {
            return res.status(404).json({ error: "Detalle de entrega no encontrado" });
        }
        if (!importe || !fecha) {
            return res.status(400).json({ error: "Todos los campos son obligatorios" });
        }
        const updateDetalleEntrega = await detallesEntregaService.updateDetalleEntrega(importe, fecha, id);
        res.json(updateDetalleEntrega);
    } catch (error) {
        console.log(error);
    }
}
module.exports = {
    getAllDetalles,
    getDetalleEntregaByID,
    addDetalleEntrega,
    dropDetalleEntrega,
    upDetalleEntrega,
    updateDetalleEntrega
}