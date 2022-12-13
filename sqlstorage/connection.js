require('dotenv').config()

const connection = {
    host: 'localhost',
    user: process.env.MARIA_DB_USER,
    password: process.env.MARIA_DB_PASSWORD,
    port: 3307,
    database: process.env.MARIA_DB_DATABASE
}

module.exports = connection