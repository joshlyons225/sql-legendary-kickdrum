const inquirer = require('inquirer');
const db = require('../db/connection');
require('console.table')

// initalizeApp function
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

// viewEmployee function
function viewEmployee() {
    const query = `
    SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name AS department, role.salary, CONCAT(manager.first_name, ' ', manager.last_name) AS manager
    FROM employee
    LEFT JOIN employee manager on manager.id = employee.manager_id
    INNER JOIN role ON (role.id = employee.role_id)
    INNER JOIN department ON (department.id = role.department_id)
    ORDER BY employee.id;
    `;
    // query db for above function
    db.query(query, (err, res) => {
        if (err) throw err;
        console.table(res);
        console.log('You found an employee!\n')
        // recall initializeApp function
        initializeApp();
    });
};

// viewByDepartment function



// addEmployee function



// removeEmployee function



// updateRole function



// addRole function




module.exports = initializeApp;