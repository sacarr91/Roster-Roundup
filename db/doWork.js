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
                    name: `${row.name}`,
                    value: row.id
                }
            ));
        });
    return listDeptArr;
}

async function empArray() {
    let listEmpArr = [];
    await sql.listAllEmployees()
        .then(({ rows }) => {
            rows.forEach(row => listEmpArr.push(
                {
                    name: `${row.name}`,
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
            rows.forEach(row => listRoleArr.push(`${row.name}`));
        });
    return listRoleArr;
}




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

function addNewEmployee() {
    let employee;
    empArray();
    roleArray()
        .then((listEmpArr, listRoleArr) =>
            inquirer.prompt([
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
                    choices: [...listRoleArr]
                },
                {
                    type: 'list',
                    name: 'newEmpManager',
                    message: `Who is the employee's manager?`,
                    choices: [...listEmpArr, 'None']
                }])
        )
        //get m_id
        .then(({ newEmpManager }) => {
            let m_id = sql.getPersonId(newEmpManager);
            return m_id;
        })
        //get r_id
        .then(({ newEmpRole }) => {
            let r_id = sql.getRoleId(newEmpRole);
            return r_id;
        })
        .then(({ newEmpFirstName, newEmpLastName }, r_id, m_id) => {
            employee = `${newEmpFirstName} ${newEmpLastName}`;
            sql.addEmpToDB(newEmpFirstName, newEmpLastName, r_id, m_id);
            console.log(`Added ${employee} department to database.`);
        })
        .then(() => userChoice())
}



////// UPDATE

function updateEmployeeRole() {
    let employee;
    empArray();
    roleArray()
        .then((listEmpArr, listRoleArr) =>
            inquirer.prompt([
                {
                    type: 'list',
                    name: 'updateEmpSelect',
                    message: `Which employee's role do you want to update?`,
                    choices: [...listEmpArr]
                },
                {
                    type: 'list',
                    name: 'updateEmpRole',
                    message: `Which role do you want to assign the selected employee?`,
                    short: '(Use arrow keys)',
                    choices: [...listRoleArr]
                },
            ]))
        .then(({ updateEmpSelect }) => {
            employee = updateEmpSelect;
            let e_id = sql.getPersonId(employee);
            return e_id;
        })
        .then(({ updateEmpRole }) => {
            let r_id = sql.getRoleId(updateEmpRole);
            return r_id;
        })
        .then((e_id, r_id) =>
            sql.updateEmpRoleInDB(e_id, r_id)
        )
        .then((employee) =>
            console.log(`Updated ${employee}'s role`))
        .then(() => userChoice())
}

module.exports = {
    userChoice,
    viewAllDepartments, viewAllEmployees, viewAllRoles,
    addNewDepartment, addNewRole, addNewEmployee,
    updateEmployeeRole
};