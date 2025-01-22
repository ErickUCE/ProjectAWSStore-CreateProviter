const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: '3.80.113.165',
    user: 'erick',
    password: 'Password@123',
    database: 'ProviderDB'
});

connection.connect((err) => {
    if (err) {
        console.error('Error connecting to the database:', err);
        return;
    }
    console.log('Connected to the database!');
    connection.end();
});
