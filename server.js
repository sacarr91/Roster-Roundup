// const db = require('./db');
const inquirer = require('inquirer');
const welcomeGraphic = require('./db/welcome');
const { mainMenu, newDepQuestion, newRoleQuestions, newEmployeeQuestions, updateEmpQuestions } = require('./db/prompts');
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
                    addNewEmployee();
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
                    addNewRole();
                    break;
                }
                case "viewAllDepDetail": {
                    viewAllDepartments();
                    break;
                }
                case "addDep": {
                    addNewDepartment();
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



//////// ADD NEW 

function addNewRole() {
    inquirer.prompt(newRoleQuestions)
        .then(({ newRoleDep }) => {
            let d_id = getDepartmentId(newRoleDep);
            return d_id;
        })
        .then(({ newRoleName, newRoleSalary, d_id }) => {
            q.addRoleToDB(newRoleName, newRoleSalary, d_id)
        })
        .finally(console.log(`Added role of ${newRoleName} to database`));
};

function addNewEmployee() {
    inquirer.prompt(newEmployeeQuestions)
        //get m_id
        .then(({ newEmpManager }) => {
            let m_id = getPersonId(newEmpManager);
            return m_id;
        })
        //get r_id
        .then(({ newEmpRole }) => {
            let r_id = getRoleId(newEmpRole);
            return r_id;
        })
        .then(({ newEmpFirstName, newEmpLastName }, r_id, m_id) => {
            q.addEmpToDB(newEmpFirstName, newEmpLastName, r_id, m_id)
        })
        .finally(() =>
            console.log(`Added ${newEmpFirstName} ${newEmpLastName} department to database.`));
};

function addNewDepartment() {
    inquirer.prompt(newDepQuestion)
        .then(({ newDep }) =>
            q.addDepToDB(newDep))
        .finally(() =>
            console.log(`Added ${newDep} department to database.`))
};


////// UPDATE

function updateEmployeeRole() {
    inquirer.prompt(updateEmpQuestions)
        .then(({ updateEmpSelect }) => {
            let e_id = q.getPersonId(updateEmpSelect);
            return e_id;
        })
        .then(({ updateEmpRole }) => {
            let r_id = q.getRoleId(updateEmpRole);
            return r_id;
        })
        .then((e_id, r_id) =>
            q.updateEmpRoleInDB(e_id, r_id)
        )
        .finally((updateEmpSelect) =>
            console.log(`Updated ${updateEmpSelect}'s role`));
};




////////// INIT
welcomeGraphic();
userChoice();