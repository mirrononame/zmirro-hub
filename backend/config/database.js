const mysql = require('mysql2');

// Создайте объект подключения к базе данных
const pool = mysql.createPool({
    host: 'sql11.freemysqlhosting.net',
    user: 'sql11703961',
    database: 'sql11703961',
    password: 'Nus24i2m5q',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

// Для использования Promise API
const promisePool = pool.promise();

module.exports = promisePool;
