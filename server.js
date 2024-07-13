const db = require('./db');
const inquirer = require('inquirer');
const welcomeGraphic = require('./db/welcome');
const { mainMenu, newDepQuestion, newRoleQuestions, newEmployeeQuestions } = require('./db/prompts');

// Create inquirer function with prompts as main prompt for the user





// chain with .then & include switch

function userChoice() {
    inquirer.prompt(mainMenu)
        .then((answer) => {
            switch (answer) {
                case viewEmps:

                    break;
                case addEmp:

                    break;
                case updateEmp:

                    break;
                case viewRoles:

                    break;
                case addRole:

                    break;
                case viewDeps:

                    break;
                case addDep:

                    break;
                case quit:

                    break;
            }

        });
};

// create functions (like in query.js line 18)

function viewAllDepartments() {
    db.findAllDepartments()
        .then(({ rows }) => {
            let departments = rows;
            console.table(departments);
        })
        .then(() => userChoice());
}




// initiate app on startup
welcomeGraphic();
userChoice();