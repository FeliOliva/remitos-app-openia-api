const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const getAllClients = async () => {
    try {
        const clients = await prisma.cliente.findMany({});
        return clients;
    } catch (error) {
        throw error;
    }
}

const addClient = async (nombre, apellido) => {
    try {
        const client = await prisma.$transaction(async (prisma) => {
            const newClient = await prisma.cliente.create({
                data: {
                    nombre,
                    apellido
                }
            });

            const newEntrega = await prisma.entrega.create({
                data: {
                    clienteId: newClient.id,
                }
            });

            const newRemito = await prisma.remito.create({
                data: {
                    clienteId: newClient.id,
                    entregaId: newEntrega.id,
                }
            });
            return { newClient, newRemito, newEntrega };
        });

        return client;
    } catch (error) {
        throw error;
    }
};


const getClientByID = async (id) => {
    try {
        const client = await prisma.cliente.findUnique({ where: { id: parseInt(id, 10) }, });
        return client;
    } catch (error) {
        throw error;
    }
}


const updateClientStatus = async (id, estado) => {
    try {
        const client = await prisma.cliente.update({
            where: { id: parseInt(id) },
            data: { estado },
        });
        return client;
    }
    catch (error) {
        throw error;
    }
};

const updateClient = async (id, data) => {
    try {
        const client = await prisma.cliente.update({
            where: { id: parseInt(id) },
            data,
        });
        return client;
    }
    catch (error) {
        throw error;
    }
};

module.exports = {
    getAllClients,
    addClient,
    getClientByID,
    updateClientStatus,
    updateClient
}