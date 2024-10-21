const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();


const getAllEntregas = async () => {
    try {
        const entregas = await prisma.entrega.findMany();
        return entregas;
    } catch (error) {
        throw error;
    }
};

const getEntregaByID = async (id) => {
    try {
        const entrega = await prisma.entrega.findUnique({ where: { id: parseInt(id, 10) } });
        return entrega;
    } catch (error) {
        throw error;
    }
};



module.exports = {
    getAllEntregas,
    getEntregaByID,
};
