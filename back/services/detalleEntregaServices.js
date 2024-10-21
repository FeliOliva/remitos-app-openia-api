const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const getAllDetalles = async () => {
    try {
        const detalles = await prisma.detalleEntrega.findMany();
        return detalles;
    } catch (error) {
        throw error;
    }
};

const getDetalleEntregaByID = async (id) => {
    try {
        const entrega = await prisma.detalleEntrega.findUnique({ where: { id: parseInt(id, 10) } });
        return entrega;
    } catch (error) {
        throw error;
    }
};

const updateEntregaStatus = async (id, estado) => {
    try {
        const updatedEntrega = await prisma.detalleEntrega.update({
            where: {
                id: parseInt(id),
            },
            data: {
                estado
            }
        });
        return updatedEntrega;
    } catch (error) {
        throw new Error("Error al actualizar la entrega");
    }
};

const addDetalleEntrega = async ({ importe, fecha, entregaId }) => {
    try {
        const newDetalleEntrega = await prisma.detalleEntrega.create({
            data: {
                importe,
                fecha,
                entregaId
            }
        });
        const entrega = await prisma.entrega.update({
            where: {
                id: entregaId
            },
            data: {
                subTotal: parseFloat((entrega.total + importe).toFixed(2)),
            }
        })
        return newDetalleEntrega;
    } catch (error) {
        throw new Error("Error al crear el remito");
    }
};

const updateDetalleEntrega = async (id, importe, fecha) => {
    try {
        const detalleActual = await prisma.detalleEntrega.findUnique({
            where: { id: parseInt(id) },
        });

        const updatedDetalleEntrega = await prisma.detalleEntrega.update({
            where: { id: parseInt(id) },
            data: { importe, fecha },
        });

        const entrega = await prisma.entrega.update({
            where: { id: detalleActual.entregaId },
            data: {
                total: parseFloat((entrega.total - detalleActual.importe + importe).toFixed(2)),
            },
        });

        return updatedDetalleEntrega;
    } catch (error) {
        throw new Error("Error al actualizar los detalles de remitos");
    }
};

module.exports = {
    getAllDetalles,
    getDetalleEntregaByID,
    updateEntregaStatus,
    addDetalleEntrega,
    updateDetalleEntrega
};
