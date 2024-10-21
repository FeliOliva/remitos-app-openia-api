const entregaService = require('../services/entregaServices');

const getAllEntregas = async (req, res) => {
    try {
        const entregas = await entregaService.getAllEntregas();
        res.json(entregas);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getEntregaByID = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) {
            return res.status(400).json({ error: 'ID es requerido' });
        }
        const entrega = await entregaService.getEntregaByID(id);
        if (!entrega) {
            return res.status(404).json({ error: 'Entrega no encontrada' });
        }
        res.json(entrega);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


module.exports = {
    getAllEntregas,
    getEntregaByID,
}