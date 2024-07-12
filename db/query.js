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

    findAllRoles() {
        return this.query("SELECT role.id, role.title, role.DEPARMENTNAME**, role.SALARYAMOUNT** FROM role"); // <-- needs a join situation
    }

    findAllEmployees() {
        return this.query("SELECT employee.id, first_name, last_name, title, departmentNAME, salaryAMOUNT, managerNAME FROM employee"); // <-- needs a join situation
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

};

// find all departments





// export & require in server.js
module.exports = new DB();