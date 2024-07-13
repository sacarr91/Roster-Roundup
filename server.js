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
    let role;
    inquirer.prompt(newRoleQuestions)
        .then(({ newRoleDep }) => {
            let d_id = getDepartmentId(newRoleDep);
            return d_id;
        })
        .then(({ newRoleName, newRoleSalary, d_id }) => {
            role = newRoleName;
            q.addRoleToDB(role, newRoleSalary, d_id);
            return role;
        })
        .then(console.log(`Added role of ${role} to database`))
        .then(() => userChoice());
};

function addNewEmployee() {
    let employee;
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
            employee = `${newEmpFirstName} ${newEmpLastName}`;
            q.addEmpToDB(newEmpFirstName, newEmpLastName, r_id, m_id);
            return employee;
        })
        .then(() =>
            console.log(`Added ${employee} department to database.`))
        .then(() => userChoice());
};

function addNewDepartment() {
    let dept;
    inquirer.prompt(newDepQuestion)
        .then(({ newDep }) => {
            dept = newDep;
            q.addDepToDB(dept);
            return dept;
        })
        .then((dept) =>
            console.log(`Added ${dept} department to database.`))
        .then(() => userChoice());
};


////// UPDATE

function updateEmployeeRole() {
    let employee;
    inquirer.prompt(updateEmpQuestions)
        .then(({ updateEmpSelect }) => {
            let employee = updateEmpSelect;
            let e_id = q.getPersonId(employee);
            return employee, e_id;
        })
        .then(({ updateEmpRole }) => {
            let r_id = q.getRoleId(updateEmpRole);
            return r_id;
        })
        .then((e_id, r_id) =>
            q.updateEmpRoleInDB(e_id, r_id)
        )
        .then((employee) =>
            console.log(`Updated ${employee}'s role`))
        .then(() => userChoice());
};




////////// INIT
welcomeGraphic();
userChoice();