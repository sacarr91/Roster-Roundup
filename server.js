const db = require('./db');
const inquirer = require('inquirer');

// Create inquirer function with prompts as main prompt for the user
// chain with .then & include switch
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
userChoice();