const { ApolloServer } = require('apollo-server');
const gql = require('graphql-tag');
const sequelize = require('./database'); // Importa la conexión de Sequelize
const resolvers = require('./resolvers'); // Resolvers para GraphQL

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

