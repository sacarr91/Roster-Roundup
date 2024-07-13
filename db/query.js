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
        return this.query("SELECT e.id, e.first_name, e.last_name, r.title, d.name, r.salary, manager.first_name, manager.last_name FROM employee e JOIN role r ON e.role_id = r.id JOIN department d on r.department_id = d.id LEFT JOIN employee manager ON e.manager_id = manager.id;"); // combine manager first & last name?
    }

    newDepartment() {
        // INSERT {input} INTO department
        // return console.log("Added {input} to database")
    }

    newRole() {
        // newRoleName => INSERT {input} INTO role
        // newRoleSalary =>
        // newRoleDep =>
        // return console.log("Added {nameOfNewRole} to database")
    }

    newEmployee() {
// first
// last
// role
// manager
// 'added to database'
    }

    updateEmployeeRole() {

    }

};

// find all departments





// export & require in server.js
module.exports = new DB();