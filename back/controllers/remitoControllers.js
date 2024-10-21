const remitoService = require("../services/remitoServices");

const getAllRemitos = async (req, res) => {
    try {
        const remitos = await remitoService.getAllRemitos();
        res.json(remitos);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error al obtener los remitos" });
    }
};

const getRemitoByID = async (req, res) => {
    try {
        const { id } = req.params;

        if (!id) {
            return res.status(400).json({ error: "ID es requerido" });
        }
        const remito = await remitoService.getRemitoByID(id);
        res.json(remito);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error al obtener el remito" });
    }
};


module.exports = {
    getAllRemitos,
    getRemitoByID,
};