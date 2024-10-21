const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();


const getAllRemitos = async () => {
    try {
        const remitos = await prisma.remito.findMany();
        return remitos;
    } catch (error) {
        throw error;
    }
};

const getRemitoByID = async (id) => {
    try {
        const remito = await prisma.remito.findUnique({ where: { id: parseInt(id, 10) } });
        return remito;
    } catch (error) {
        throw error;
    }
}


const updateRemitos = async (id, clienteId, fecha) => {
    try {
        const updatedRemito = await prisma.remito.update({
            where: {
                id: parseInt(id), // Asegúrate de convertir el ID a entero
            },
            data: {
                clienteId,
                fecha
            }
        });
        return updatedRemito;
    } catch (error) {
        throw new Error("Error al actualizar el remito");
    }
};

module.exports = {
    getAllRemitos,
    getRemitoByID,
    updateRemitos
}