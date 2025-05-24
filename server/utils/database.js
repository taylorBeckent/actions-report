// // import mysql from 'mysql';
const mysql = require('mysql2');

const db = mysql.createConnection({
    host: '47.116.181.171',
    user: 'nextDB',
    database: 'nextdb',
    password: 'BXSW4w2RD5cP2JJC',
})

module.exports = db;
