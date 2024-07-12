const db = require('./db');
const inquirer = require('inquirer');
const welcomeGraphic = require('./db/welcome');
const questions = require('./db/prompts');

// Create inquirer function with prompts as main prompt for the user





// chain with .then & include switch

function userChoice() {
    inquirer.prompt(questions)
        .then((answers) => {
            // const mdContent = generateMarkdown(answers);
        
            // writeFile("README-template.md", mdContent)
            // .catch(err ? console.log(err) : console.log("Successfully created MD file!")
            // );
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