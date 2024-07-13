// const db = require('./db');
const inquirer = require('inquirer');
const welcomeGraphic = require('./db/welcome');
const { mainMenu, newDepQuestion, newRoleQuestions, newEmployeeQuestions, updateEmployeeQuestions } = require('./db/prompts');
const q = require('./db/query')

function userChoice() {
        inquirer.prompt(mainMenu)
        .then(({main}) => {
            switch (main) {
                case "viewAllEmpDetail": {
                    viewAllEmployees();
                    break;
                }
                case "addEmp": {
                    newEmployee();
                    break;
                }
                case "updateEmp": {
                    updateEmployeeRole();
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
                    newDepartment();
                    break;
                }
                case "quit": {
                    console.log(`See you next time! Type 'npm start' to run app again.`)
                    break;
                }

            }
        });
};

// create functions (like in query.js line 18)

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
            console.table(rows);
        })
        .then(() => userChoice());
};




// initiate app on startup
welcomeGraphic();
userChoice();