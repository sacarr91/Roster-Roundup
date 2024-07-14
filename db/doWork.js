const inquirer = require('inquirer');
const sql = require('./query');
const { mainMenu } = require('./mainMenu')

async function userChoice() {
    await inquirer.prompt(mainMenu)
        .then(({ main }) => {
            switch (main) {
                case "viewAllDepDetail": {
                    viewAllDepartments();
                    break;
                }
                case "viewAllRoleDetail": {
                    viewAllRoles();
                    break;
                }
                case "viewAllEmpDetail": {
                    viewAllEmployees();
                    break;
                }
                case "addDep": {
                    addNewDepartment();
                    break;
                }
                case "addRole": {
                    addNewRole();
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
                case "quit": {
                    console.log(`See you next time! Type 'npm start' to run app again.`)
                    break;
                }
            }
        })
}


////////// VIEW ALL

function viewAllDepartments() {
    sql.findAllDepartments()
        .then(({ rows }) => {
            let departments = rows;
            console.table(departments);
        })
        .then(() => userChoice())
}

function viewAllRoles() {
    sql.findAllRoles()
        .then(({ rows }) => {
            let roles = rows;
            console.table(roles);
        })
        .then(() => userChoice())
}

function viewAllEmployees() {
    sql.findAllEmployees()
        .then(({ rows }) => {
            let employees = rows;
            console.table(employees);
        })
        .then(() => userChoice())
}




//////// create arrays to list choices
async function deptArray() {
    let listDeptArr = [];
    await sql.listAllDepartments()
        .then(({ rows }) => {
            rows.forEach(row => listDeptArr.push(
                {
                    name: row.name,
                    value: row.id
                }
            ));
        });
    return listDeptArr;
}

async function managerArray() {
    let listEmpArr = [];
    await sql.listAllEmployees()
        .then(({ rows }) => {
            rows.forEach(row => listEmpArr.push(
                {
                    name: row.name,
                    value: row.id
                }
            ));
        });
    return listEmpArr;
}

async function roleArray() {
    let listRoleArr = [];
    await sql.listAllRoles()
        .then(({ rows }) => {
            rows.forEach(row => listRoleArr.push(
                {
                    name: row.title,
                    value: row.id
                }
            ));
        });
    return listRoleArr;
}

async function getArraysForNewEmp(empArr, roleArr) {
    empArr = await managerArray();
    roleArr = await roleArray();
    return { empArr, roleArr };
};


///////// ADD NEW

function addNewDepartment() {
    inquirer.prompt([
        {
            type: 'input',
            name: 'newDep',
            message: 'What is the name of the department?'
        }
    ])
        .then(({ newDep }) => {
            sql.addDepToDB(newDep);
            console.log(`Added ${newDep} department to database.`);
        })
        .then(() => userChoice())
}

function addNewRole() {
    let answers;
    deptArray()
        .then(async (listDeptArr) => {
            answers = await inquirer.prompt([
                {
                    type: 'input',
                    name: 'newRoleName',
                    message: 'What is the name of the role?'
                },
                {
                    type: 'number',
                    name: 'newRoleSalary',
                    message: 'What is the salary of the role?',
                    // validate: () => console.log('connect function') // <-- what is needed to ensure response is a number?
                },
                {
                    type: 'list',
                    name: 'newRoleDep',
                    message: 'Which department does the role belong to?',
                    short: '(Use arrow keys)',
                    choices: [...listDeptArr]
                }]);
            return answers;
        })
        .then(({ newRoleDep, newRoleName, newRoleSalary }) => {
            sql.addRoleToDB(newRoleName, newRoleSalary, newRoleDep);
            console.log(`Added role of ${newRoleName} to database`);
        })
        .then(() => userChoice())

}

async function addNewEmployee() {
    let answers;
    getArraysForNewEmp()
        .then(({ empArr, roleArr }) => {
            answers = inquirer.prompt([
                {
                    type: 'input',
                    name: 'newEmpFirstName',
                    message: `What is the employee's first name?`,
                },
                {
                    type: 'input',
                    name: 'newEmpLastName',
                    message: `What is the employee's last name?`,
                },
                {
                    type: 'list',
                    name: 'newEmpRole',
                    message: `What is the employee's role?`,
                    choices: [...roleArr]
                },
                {
                    type: 'list',
                    name: 'newEmpManager',
                    message: `Who is the employee's manager?`,
                    choices: [...empArr, { name: 'None', value: '' }]
                }]);
            return answers;
        })
        .then(({ newEmpFirstName, newEmpLastName, newEmpRole, newEmpManager }) => {
            sql.addEmpToDB(newEmpFirstName, newEmpLastName, newEmpRole, newEmpManager);
            console.log(`Added ${newEmpFirstName} ${newEmpLastName} to employee database.`);
        })
        .then(() => userChoice())
}



////// UPDATE

async function updateEmployeeRole() {
    let answers;
    getArraysForNewEmp()
        .then(({ empArr, roleArr }) => {
            answers = inquirer.prompt([
                {
                    type: 'list',
                    name: 'updateEmpSelect',
                    message: `Which employee's role do you want to update?`,
                    choices: [...empArr]
                },
                {
                    type: 'list',
                    name: 'updateEmpRole',
                    message: `Which role do you want to assign the selected employee?`,
                    short: '(Use arrow keys)',
                    choices: [...roleArr]
                },
            ]);
            return answers;
        })
        .then(({ updateEmpSelect, updateEmpRole }) => {
        sql.updateEmpRoleInDB(updateEmpSelect, updateEmpRole);
        console.log(`Updated employee's role`)
    })
        .then(() => userChoice())
}

module.exports = {
    userChoice,
    viewAllDepartments, viewAllEmployees, viewAllRoles,
    addNewDepartment, addNewRole, addNewEmployee,
    updateEmployeeRole
};