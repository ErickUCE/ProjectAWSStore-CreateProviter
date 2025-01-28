const { ApolloServer } = require('apollo-server');
const gql = require('graphql-tag');
const sequelize = require('./database'); // Importa la conexión de Sequelize
const resolvers = require('./resolvers'); // Resolvers para GraphQL

/*/const app = express();
app.use(bodyParser.json());

// Endpoint para sincronización
app.post('/sync-provider', async (req, res) => {
    const { id } = req.body;

    try {
        // Elimina el proveedor de la base de datos
        await Provider.destroy({ where: { id } });
        console.log(`Provider with ID ${id} deleted from "crear proveedor"`);

        res.status(200).send({ message: `Provider with ID ${id} synced successfully` });
    } catch (error) {
        console.error('Error syncing provider:', error);
        res.status(500).send({ error: 'Failed to sync provider' });
    }
});

app.listen(5000, () => {
    console.log('REST server listening on port 5000');
});
/*/

const express = require('express');
const bodyParser = require('body-parser');
const Provider = require('./models/provider');

const app = express();
app.use(bodyParser.json());

// Endpoint para sincronizar eliminación de proveedores
app.post('/sync-delete', async (req, res) => {
    const { id } = req.body;

    try {
        // Elimina el proveedor de la base de datos local
        const provider = await Provider.findByPk(id);
        if (provider) {
            await provider.destroy();
            console.log(`Proveedor con ID ${id} eliminado localmente en Crear`);
        } else {
            console.log(`Proveedor con ID ${id} no encontrado en Crear`);
        }

        res.status(200).send({ message: `Proveedor con ID ${id} eliminado correctamente` });
    } catch (error) {
        console.error('Error sincronizando eliminación de proveedor:', error);
        res.status(500).send({ error: 'Failed to sync provider deletion' });
    }
});

app.listen(5000, () => {
    console.log('REST server listening on port 5000');
});

// Esquema GraphQL
const typeDefs = gql`
    type Query {
        _empty: String
    }

    type Mutation {
        createProvider(input: ProviderInput!): Provider
    }

    input ProviderInput {
        name: String!
        address: String!
        email: String!
    }

    type Provider {
        id: ID!
        name: String!
        address: String!
        email: String!
    }
`;

// Crear instancia de Apollo Server
const server = new ApolloServer({
    typeDefs,
    resolvers,
});

// Sincronizar base de datos y levantar servidor
sequelize.sync() // Sin forzar la recreación
    .then(() => {
        console.log('Database synced!');
        server.listen({ port: 4000 }).then(({ url }) => {
            console.log(`🚀 Server ready at ${url}`);
        });
    })
    .catch(err => {
        console.error('Error syncing database:', err);
    });

