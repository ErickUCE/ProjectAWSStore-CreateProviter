const axios = require('axios');
const Provider = require('./models/provider'); // Modelo para la base de datos remota

const resolvers = {
    Mutation: {
        createProvider: async (_, { input }) => {
            try {
                // Inserta el proveedor en la base de datos remota
                const provider = await Provider.create(input);

                // Notifica al microservicio de Eliminar
                const instances = [
                    'http://localhost:5001/sync-provider', // Cambia a tu configuración
                ];

                for (const instance of instances) {
                    try {
                        await axios.post(instance, provider.toJSON());
                        console.log(`Notificación enviada a ${instance}`);
                    } catch (error) {
                        console.error(`Error notificando a ${instance}:`, error.message);
                    }
                }

                return provider;
            } catch (error) {
                console.error('Error creando proveedor:', error);
                throw new Error('Failed to create provider');
            }
        },
    },
};

module.exports = resolvers;
