const inquirer = require('inquirer');
require('console.table')

function initializeApp() {
    inquirer.prompt({
        type: 'list',
        name: 'task',
        message: 'What you wanna do, boss?',
        choices: ['View Employees', 'View Employees by Department', 'Add an Employee', 'Remove an Employee', 'Update Role', 'Add Role', 'Terminate Session']
    })
    
    // switch between task options above
    .then(function ({ task }) {
        switch (task) {
            case 'View Employees':
                viewEmployee();
                break;
            case 'View Employees by Department':
                viewByDepartment();
                break;
            case 'Add an Employee':
                addEmployee();
                break;
            case 'Remove an Employee':
                removeEmployee();
                break;
            case 'Update Role':
                updateRole();
                break;
            case 'Add Role':
                addRole();
                break;
            case 'Terminate Session':
                db.end();
                break;
        }
    });
};

module.exports = initializeApp;