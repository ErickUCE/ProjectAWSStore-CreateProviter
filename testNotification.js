const axios = require('axios');

async function testNotification() {
    try {
        const response = await axios.post('http://44.222.206.85:5001/sync-provider', {
            id: 1,
            name: 'Proveedor Test',
            address: 'Dirección Test',
            email: 'test@proveedor.com',
        });
        console.log('Respuesta del microservicio de eliminar:', response.data);
    } catch (error) {
        console.error('Error enviando notificación:', error.message);
    }
}

testNotification();
