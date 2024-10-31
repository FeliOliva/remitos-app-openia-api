require("dotenv").config(); // Cargar .env al inicio

const OpenAI = require("openai");
const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY, // Asegura que esta clave esté disponible
});

const getMessaged = async (message) => {
    const prompt = `
   Eres un asistente que ayuda a realizar acciones en un sistema de cuentas corrientes de clientes, remitos y entregas.
   Responde ÚNICAMENTE con un JSON en este formato:
   {
     "action": "agregar_cliente",
     "data": { "nombre": "Nombre del cliente", "apellido": "Apellido del cliente" }
   }
   o en el caso de agregar un remito:
   {
     "action": "agregar_remito",
     "data": { "importe": "Importe del remito", "fecha": "Fecha del remito", "nombreCliente": "Nombre del cliente", "apellidoCliente": "Apellido del cliente" }
   }
   
   El mensaje puede llegar, por ejemplo: "Agrega un remito para Juan Perez de 15000 en la fecha 24/10/2024".
   Un cliente puede no tener apellido por lo tanto te pueden llegar mensajes como agrega un cliente que se llama Juan, en este caso el apellido lo tendrias que pasar como un string vacio.
   Nota: La respuesta debe estar en formato JSON estricto sin texto adicional.

   Usuario: ${message}
`;

    try {
        const response = await openai.chat.completions.create({
            model: "gpt-4",
            messages: [
                { role: "system", content: prompt },
                { role: "user", content: message },
            ],
            max_tokens: 100,
        });

        const aiMessage = response.choices[0].message.content.trim();

        try {
            const parsedMessage = JSON.parse(aiMessage);
            console.log("Respuesta de OpenAI interpretada como JSON:", parsedMessage);
            return parsedMessage;
        } catch (error) {
            console.error("No se pudo interpretar la respuesta de OpenAI como JSON:", aiMessage);
            throw new Error("Respuesta no válida de OpenAI.");
        }
    } catch (error) {
        console.error("Error de OpenAI:", error);
        throw new Error(`Error de OpenAI: ${error.message}`);
    }
};

module.exports = {
    getMessaged,
};
