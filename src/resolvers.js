const axios = require('axios');
const Provider = require('./models/provider'); // Modelo para la base de datos remota

const resolvers = {
    Mutation: {
        createProvider: async (_, { input }) => {
            try {
                // ✅ Crear proveedor en la base de datos
                const provider = await Provider.create(input);
                console.log("✅ Proveedor creado en CreateProvider:", provider.toJSON());

                // ✅ Notificar a los otros microservicios con el ID generado
                const instances = [
                    'http://23.21.70.193:5001/sync-create', // Microservicio de Eliminar
                    'http://52.5.181.183:5002/sync-create',  // Microservicio de Update
                    'http://3.229.198.244:5003/sync-create'  // Microservicio de Leer
                ];

                for (const instance of instances) {
                    try {
                        console.log(`📡 Enviando notificación a ${instance} con data:`, provider.toJSON());
                        const response = await axios.post(instance, provider.toJSON());
                        console.log(`✅ Respuesta de ${instance}:`, response.data);
                    } catch (error) {
                        console.error(`❌ Error notificando a ${instance}:`, error.response?.data || error.message);
                    }
                }

                return provider;
            } catch (error) {
                console.error('❌ Error creando proveedor:', error);
                throw new Error('Failed to create provider');
            }
        },
    },
};

module.exports = resolvers;
