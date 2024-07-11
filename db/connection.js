const { Pool } = require('pg');
require('dotenv').config();

// Connect to database
const pool = new Pool(
    {
        user: DB_USER,
        password: DB_PASSWORD,
        host: 'localhost',
        database: 'roster_roundup_db'
    },
    console.log(`Connected to the roster_roundup_db database.`)
)

module.exports = pool;