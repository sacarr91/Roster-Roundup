const { Pool } = require('pg');
require('dotenv').config();

// Connect to database
const pool = new Pool(
    {
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        host: process.env.DB_HOST,
        database: 'roster_db'
    },
    console.log(`Connected to the roster_db database.`)
)

module.exports = pool;