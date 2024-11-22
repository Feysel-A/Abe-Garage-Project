const mysql = require('mysql2/promise');
const connection = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
})
//Check if the connection is successful 

connection.getConnection()
   .then(connection => {
        console.log('Database connected');
    })
   .catch(err => {
        console.log('Database connection failed',err);
    })

module.exports = connection;