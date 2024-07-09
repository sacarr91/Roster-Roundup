const express = require('express');
const { Pool } = require('pg');
require('dotenv').config();

const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

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

pool.connect();