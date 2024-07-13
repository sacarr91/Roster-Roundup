const { findAllEmployees, findAllRoles, selectManager, listAllRoles, listAllDepartments, listAllEmployees } = require("./query");

const mainMenu = [
    {
        type: 'list',
        name: 'main',
        message: 'What would you like to do?',
        short: '(Use arrow keys)',
        choices: [
            {
                name: "View All Employees",
                value: "viewAllEmpDetail"
            },
            {
                name: "Add Employee",
                value: "addEmp"
            },
            {
                name: "Update Employee Role",
                value: "updateEmp"
            },
            {
                name: "View All Roles",
                value: "viewAllRoleDetail"
            },
            {
                name: "Add Role",
                value: "addRole"
            },
            {
                name: "View All Departments",
                value: "viewAllDepDetail"
            },
            {
                name: "Add Department",
                value: "addDep"
            },
            {
                name: "Quit",
                value: "quit"
            }
        ],
        pageSize: 7,
        suffix: '(Move up and down to reveal more choices)'
    }];

const newDepQuestion = [
    {
        type: 'input',
        name: 'newDep',
        message: 'What is the name of the department?'
    }];

const newRoleQuestions = [
    {
        type: 'input',
        name: 'newRoleName',
        message: 'What is the name of the role?'
    },
    {
        type: 'number',
        name: 'newRoleSalary',
        message: 'What is the salary of the role?',
        validate: () => console.log('connect function') // <-- what is needed to ensure response is a number?
    },
    {
        type: 'list',
        name: 'newRoleDep',
        message: 'Which department does the role belong to?',
        short: '(Use arrow keys)',
        choices: [{ ...listAllDepartments }],
    }];

const newEmployeeQuestions = [
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
        choices: [{ ...listAllRoles }],
        suffix: '(Move up and down to reveal more choices)'
    },
    {
        type: 'list',
        name: 'newEmpManager',
        message: `Who is the employee's manager?`,
        choices: [{ ...listAllEmployees }, 'None'],
        suffix: '(Move up and down to reveal more choices)'
    }];

const updateEmpQuestions = [
    {
        type: 'list',
        name: 'updateEmpSelect',
        message: `Which employee's role do you want to update?`,
        choices: [{ ...listAllEmployees }]
    },
    {
        type: 'list',
        name: 'updateEmpRole',
        message: `Which role do you want to assign the selected employee?`,
        short: '(Use arrow keys)',
        choices: [{ ...listAllRoles }],
        suffix: '(Move up and down to reveal more choices)'

    },
];

module.exports = { mainMenu, newDepQuestion, newRoleQuestions, newEmployeeQuestions, updateEmpQuestions };