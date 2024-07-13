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
        return this.query("SELECT department.id, department.name FROM department;");
    }

    findAllRoles() {
        return this.query("SELECT r.id, r.title, d.name, r.salary FROM role r JOIN department d ON r.department_id = d.id;");
    }

    

    findAllEmployees() {
        return this.query("SELECT e.id, e.first_name, e.last_name, r.title, d.name AS department, r.salary, manager.first_name || ' ' || manager.last_name as manager FROM employee e JOIN role r ON e.role_id = r.id JOIN department d on r.department_id = d.id LEFT JOIN employee manager ON e.manager_id = manager.id;");
    }

    listAllEmployees() {
        return this.query("SELECT e.first_name || ' ' || e.last_name FROM employee e ORDER BY first_name;");
    }


    //// FOR CHOICE ARRAYS 

    listAllDepartments() {
        return this.query("SELECT department.name FROM department ORDER BY department;");
    }

    listAllRoles() {
        return this.query("SELECT role.title FROM role ORDER BY title;");
    }

    listAllEmployees() {
        return this.query("SELECT e.first_name || ' ' || e.last_name FROM employee e ORDER BY first_name;");
    }
   
};



// export & require in server.js
module.exports = new DB();