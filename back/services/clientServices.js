const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const getAllClients = async () => {
  try {
    const clients = await prisma.cliente.findMany({});
    return clients;
  } catch (error) {
    throw error;
  }
};

const addClient = async (nombre, apellido) => {
  try {
    const client = await prisma.$transaction(async () => {
      // Crear el nuevo cliente
      const newClient = await prisma.cliente.create({
        data: {
          nombre,
          apellido,
        },
      });

      // Crear la cuenta corriente asociada al nuevo cliente
      const newCuentaCorriente = await prisma.cuenta_Corriente.create({
        data: {
          clienteId: newClient.id,
        },
      });

      return { newClient, newCuentaCorriente };
    });

    return client;
  } catch (error) {
    throw new Error(
      "Error al agregar cliente y cuenta corriente: " + error.message
    );
  }
};

const getClientByID = async (id) => {
  try {
    const client = await prisma.cliente.findUnique({
      where: { id: parseInt(id, 10) },
    });
    return client;
  } catch (error) {
    throw error;
  }
};

const updateClientStatus = async (id, estado) => {
  try {
    const client = await prisma.cliente.update({
      where: { id: parseInt(id) },
      data: { estado },
    });
    return client;
  } catch (error) {
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
  } catch (error) {
    throw error;
  }
};

const searchClients = async (nombre, apellido) => {
  try {
    const clients = await prisma.cliente.findMany({
      where: {
        nombre: {
          contains: nombre,
        },
        apellido: apellido ? { contains: apellido } : undefined,
      },
      include: {
        Cuenta_Corriente: true, // Incluye la cuenta corriente relacionada
      },
    });

    return clients; // Devuelve el cliente junto con la cuenta corriente
  } catch (error) {
    throw error;
  }
};

module.exports = {
  getAllClients,
  addClient,
  getClientByID,
  updateClientStatus,
  updateClient,
  searchClients,
};
