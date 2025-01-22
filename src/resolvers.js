const Provider = require('./models/provider');

console.log('Provider model:', Provider); // Esto debe mostrar el modelo en la consola

const resolvers = {
    Mutation: {
        createProvider: async (_, { input }) => {
            try {
                console.log('Input received:', input); // Verifica el input recibido
                const provider = await Provider.create(input);
                return provider;
            } catch (error) {
                console.error('Error creating provider:', error);
                throw new Error('Failed to create provider');
            }
        },
    },
};

module.exports = resolvers;
