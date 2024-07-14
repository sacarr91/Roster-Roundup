const mainMenu = [
    {
        type: 'list',
        name: 'main',
        message: 'What would you like to do?',
        short: '(Use arrow keys)',
        choices: [
            {
                name: "View All Departments",
                value: "viewAllDepDetail"
            },
            {
                name: "View All Roles",
                value: "viewAllRoleDetail"
            },
            {
                name: "View All Employees",
                value: "viewAllEmpDetail"
            },
            {
                name: "Add Department",
                value: "addDep"
            },
            {
                name: "Add Role",
                value: "addRole"
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
                name: "Quit",
                value: "quit"
            }
        ],
        pageSize: 7
    }];


module.exports = { mainMenu };