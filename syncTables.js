const { Sequelize, DataTypes } = require('sequelize');

// Conexión a la base de datos del microservicio de Crear
const createDB = new Sequelize('ProveedorDB', 'user', 'password', {
    host: '<98.84.155.123>',
    dialect: 'mysql',
    logging: false,
});

// Conexión a la base de datos del microservicio de Eliminar
const deleteDB = new Sequelize('ProveedorDB', 'user', 'password', {
    host: '<IP_MICROSERVICIO_ELIMINAR>',
    dialect: 'mysql',
    logging: false,
});

// Definir el modelo de Proveedor
const ProviderModel = (sequelize) =>
    sequelize.define('Provider', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        address: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    }, {
        freezeTableName: true, // Evitar pluralización
    });

const ProviderInCreate = ProviderModel(createDB);
const ProviderInDelete = ProviderModel(deleteDB);

// Función para sincronizar las tablas
async function syncTables() {
    try {
        // Conectar a ambas bases de datos
        await createDB.authenticate();
        await deleteDB.authenticate();
        console.log('Conexión exitosa a ambas bases de datos');

        // Obtener todos los registros de la base de datos de Crear
        const providersInCreate = await ProviderInCreate.findAll();
        console.log(`Se encontraron ${providersInCreate.length} proveedores en Crear`);

        // Insertar los registros en la base de datos de Eliminar
        for (const provider of providersInCreate) {
            const existingProvider = await ProviderInDelete.findByPk(provider.id);
            if (!existingProvider) {
                await ProviderInDelete.create(provider.toJSON());
                console.log(`Proveedor con ID ${provider.id} sincronizado`);
            } else {
                console.log(`Proveedor con ID ${provider.id} ya existe en Eliminar`);
            }
        }

        console.log('Sincronización completada');
    } catch (error) {
        console.error('Error sincronizando las tablas:', error);
    } finally {
        await createDB.close();
        await deleteDB.close();
    }
}

syncTables();
