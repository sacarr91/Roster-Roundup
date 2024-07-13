// const db = require('./db');
const inquirer = require('inquirer');
const welcomeGraphic = require('./db/welcome');
const { mainMenu, newDepQuestion, newRoleQuestions, newEmployeeQuestions, updateEmployeeQuestions } = require('./db/prompts');
const q = require('./db/query')

function userChoice() {
    inquirer.prompt(mainMenu)
        .then(({ main }) => {
            switch (main) {
                case "viewAllEmpDetail": {
                    viewAllEmployees();
                    break;
                }
                case "addEmp": {
                    q.newEmployee();
                    break;
                }
                case "updateEmp": {
                    q.updateEmployeeRole();
                    break;
                }
                case "viewAllRoleDetail": {
                    viewAllRoles();
                    break;
                }
                case "addRole": {
                    newRole();
                    break;
                }
                case "viewAllDepDetail": {
                    viewAllDepartments();
                    break;
                }
                case "addDep": {
                    q.newDepartment();
                    break;
                }
                case "quit": {
                    console.log(`See you next time! Type 'npm start' to run app again.`)
                    break;
                }

            }
        });
};



////////// VIEW ALL

function viewAllDepartments() {
    q.findAllDepartments()
        .then(({ rows }) => {
            let departments = rows;
            console.table(departments);
        })
        .then(() => userChoice());
};

function viewAllRoles() {
    q.findAllRoles()
        .then(({ rows }) => {
            let roles = rows;
            console.table(roles);
        })
        .then(() => userChoice());
};

function viewAllEmployees() {
    q.findAllEmployees()
        .then(({ rows }) => {
            let employees = rows;
            console.table(employees);
        })
        .then(() => userChoice());
};




/////////// GET ID

function getDepartmentId() { // use in newRole()
    let d_id;
    q.listAllDepartments()
        .then((answer) => {
            d_id = this.query(`SELECT id FROM department WHERE department."name" = ${answer};`);
            return { answer, d_id };
        });
};

function getManagerId() {
    let m_id;
    q.listAllDepartments()
        .then(({ newEmpManager }) => {
            m_id = this.query(`SELECT id FROM employee e WHERE e.first_name || ' ' || e.last_name = ${newEmpManager};`);
            return { newEmpManager, d_id };
        });
};

//////// ADD NEW 

function addNewRole() {
    getDepartmentId()
        .then(this.query(`INSERT INTO "role" (name, salary, department_id) VALUES ('${newRoleName.input}', ${newRoleSalary.number}, ${d_id});`))
        .then(console.log(`Added role of ${newRoleName.input} to database`));
};


function addNewEmployee() {
    this.query(`INSERT INTO employee (first_name, last_name, manager_id) VALUES (${input.name});`);
    console.log(`Added ${input.name} department to database.`);
};

newDepartment() {
    this.query(`INSERT INTO department (name) VALUES (${input.name});`);
    console.log(`Added ${input.name} department to database.`);
};


////// UPDATE

updateEmployeeRole() {
    console.log(`Updated employee's role`);
};




////////// INIT
welcomeGraphic();
userChoice();