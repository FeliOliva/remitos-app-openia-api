const detalleRemitoService = require('../services/detalleRemitoServices');

const getAllDetalles = async (req, res) => {
    try {
        const detalleRemitos = await detalleRemitoService.getAllDetalles();
        res.json(detalleRemitos);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Error al obtener los detalles de remitos' });
    }
}

const addDetalleRemito = async (req, res) => {
    try {
        const { importe, fecha, remitoId, entregaId } = req.body;
        if (!importe || !fecha || !remitoId) {
            res.status(400).json('Todos los campos son obligatorios');
        }
        const newDetalle = await detalleRemitoService.addDetalleRemito({ importe, fecha, remitoId, entregaId });
        res.json(newDetalle);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Error al agregar el detalle de remito' });
    }
}

const getDetalleRemitoByID = async (req, res) => {
    try {
        const { id } = req.params
        if (!id) {
            return res.status(400).json({ error: "ID es requerido" })
        }
        const detalleRemito = await detalleRemitoService.getDetalleRemitoByID(id);
        res.json(detalleRemito);
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: 'Error al obtener el detalle de remito' });
    }
}

const dropDetalleRemito = async (req, res) => {
    try {
        const { id } = req.params
        if (!id) {
            return res.status(400).json({ error: "ID es requerido" })
        }
        const detalleRemito = await detalleRemitoService.getDetalleRemitoByID(id);
        if (!detalleRemito) {
            return res.status(404).json({ error: "Detalle de remito no encontrado" })
        }
        await detalleRemitoService.updateRemitoStatus(id, 0);
        res.json(detalleRemito);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Error al eliminar el detalle de remito' });
    }
}

const upDetalleRemito = async (req, res) => {
    try {
        const { id } = req.params
        if (!id) {
            return res.status(400).json({ error: "ID es requerido" })
        }
        const detalleRemito = await detalleRemitoService.getDetalleRemitoByID(id);
        if (!detalleRemito) {
            return res.status(404).json({ error: "Detalle de remito no encontrado" })
        }
        await detalleRemitoService.updateRemitoStatus(id, 1);
        res.json(detalleRemito);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Error al actualizar el detalle de remito' });
    }
}

const updateDetalleRemitos = async (req, res) => {
    try {
        const { id } = req.params
        const { importe, fecha, entregaId } = req.body
        if (!id) {
            return res.status(400).json({ error: "ID es requerido" })
        }
        if (!importe || !fecha) {
            return res.status(400).json({ error: "Todos los campos son obligatorios" })
        }
        const detalleRemito = await detalleRemitoService.getDetalleRemitoByID(id);
        if (!detalleRemito) {
            return res.status(404).json({ error: "Detalle de remito no encontrado" })
        }
        const updatedDetalleRemito = await detalleRemitoService.updateDetalleRemitos(id, importe, fecha, entregaId);
        res.json(updatedDetalleRemito);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Error al actualizar los detalles de remitos' });
    }
}

module.exports = {
    getAllDetalles,
    addDetalleRemito,
    getDetalleRemitoByID,
    dropDetalleRemito,
    upDetalleRemito,
    updateDetalleRemitos
}