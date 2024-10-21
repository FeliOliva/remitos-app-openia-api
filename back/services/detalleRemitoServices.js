const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const getAllDetalles = async () => {
    try {
        const detalles = await prisma.detalleRemito.findMany();
        return detalles;
    } catch (error) {
        throw error;
    }
};

const getDetalleRemitoByID = async (id) => {
    try {
        const remito = await prisma.detalleRemito.findUnique({ where: { id: parseInt(id, 10) } });
        return remito;
    } catch (error) {
        throw error;
    }
};

const updateRemitoStatus = async (id, estado) => {
    try {
        const updatedRemito = await prisma.detalleRemito.update({
            where: {
                id: parseInt(id),
            },
            data: {
                estado
            }
        });
        return updatedRemito;
    } catch (error) {
        throw new Error("Error al actualizar el remito");
    }
};

const addDetalleRemito = async ({ importe, fecha, remitoId, entregaId }) => {
    try {
        // Iniciar una transacción
        const result = await prisma.$transaction(async (prisma) => {
            // Crear nuevo detalle de remito
            const newDetalleRemito = await prisma.detalleRemito.create({
                data: {
                    importe,
                    fecha,
                    remitoId
                }
            });

            // Obtener el remito actual para actualizar el subTotal y total
            const remito = await prisma.remito.findUnique({
                where: {
                    id: remitoId
                }
            });

            // Actualizar el subtotal del remito (sumar el nuevo importe)
            const updatedRemito = await prisma.remito.update({
                where: {
                    id: remitoId
                },
                data: {
                    subTotal: parseFloat((remito.subTotal + importe).toFixed(2)), // Sumar importe al subTotal
                    total: parseFloat((remito.subTotal + importe - remito.totalEntrega).toFixed(2)) // Actualizar el total (subTotal - totalEntrega)
                }
            });

            return { newDetalleRemito, updatedRemito };
        });

        return result;
    } catch (error) {
        throw new Error("Error al agregar el detalle de remito y actualizar el remito");
    }
};

const updateDetalleRemitos = async (id, importe, fecha, entregaId) => {
    try {
        // Iniciar una transacción
        const result = await prisma.$transaction(async (prisma) => {
            // Obtener el detalle actual para restar el importe anterior
            const detalleActual = await prisma.detalleRemito.findUnique({
                where: { id: parseInt(id) },
            });

            // Actualizar el detalle del remito
            const updatedDetalleRemito = await prisma.detalleRemito.update({
                where: { id: parseInt(id) },
                data: { importe, fecha },
            });

            // Obtener el remito actual para recalcular el subtotal y total
            const remito = await prisma.remito.findUnique({
                where: { id: detalleActual.remitoId },
            });

            // Actualizar el subtotal del remito (restar el importe antiguo, sumar el nuevo importe)
            const updatedRemito = await prisma.remito.update({
                where: { id: remito.id },
                data: {
                    subTotal: parseFloat((remito.subTotal - detalleActual.importe + importe).toFixed(2)), // Recalcular el subTotal
                    total: parseFloat((remito.subTotal - detalleActual.importe + importe - remito.totalEntrega).toFixed(2)) // Recalcular el total (subTotal - totalEntrega)
                }
            });

            return { updatedDetalleRemito, updatedRemito };
        });

        return result;
    } catch (error) {
        throw new Error("Error al actualizar el detalle de remito y el remito");
    }
};



module.exports = {
    getAllDetalles,
    getDetalleRemitoByID,
    updateRemitoStatus,
    addDetalleRemito,
    updateDetalleRemitos
};