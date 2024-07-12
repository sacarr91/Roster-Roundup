

const questions = [
    {
        type: 'list',
        name: 'main',
        message: 'What would you like to do?',
        short: '(Use arrow keys)',
        choices: [
            {
                name: "View All Employees",
                value: "viewEmps"
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
                value: "viewRoles"
            },
            {
                name: "Add Role",
                value: "addRole"
            },
            {
                name: "View All Departments",
                value: "viewDeps"
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
        suffix: '(Move up and down to reveal more choices'
    },
    {
        type: 'input',
        name: 'newDep',
        message: 'What is the name of the department?'
    },
    {
        type: 'input',
        name: 'newRoleName',
        message: 'What is the name of the role?'
    },
    {
        type: 'number',
        name: 'newRoleSalary',
        message: 'What is the salary of the role?',
        validate: '' // <-- what is needed to ensure response is a number?
    },
    {
        type: 'list',
        name: 'newRoleDep',
        message: 'Which department does the role belong to?',
        short: '(Use arrow keys)',
        choices: [() => ] //function returning array of all current roles in db
    },
    {
        type: '',
        name: '',
        message: '',
    },
    {
        type: '',
        name: '',
        message: '',
    },
    {
        type: '',
        name: '',
        message: '',
    },
    {
        type: '',
        name: '',
        message: '',
    }];


module.exports = questions;