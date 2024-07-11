// use js & Classes... large object with methods

// connect to database
const pool = require('./connection');

// class to define data & methods to touch data we will define
class DB {
    constructor() { }
    async query(sql, args = []) {
        const client = await pool.connect();
        try {
            const response = await client.query(sql, args);
            return response;
        } finally {
            client.release();
        }
    }
    findAllDepartments() {
        return this.query("SELECT department.id, department.name FROM department");
    }
};

// find all departments





// export & require in server.js
module.exports = new DB();