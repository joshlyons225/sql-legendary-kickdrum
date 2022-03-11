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
function viewByDepartment() {
    const query = `
    SELECT department.name AS department, role.title, employee.id, employee.first_name, employee.last_name
    FROM employee
    LEFT JOIN role ON (role.id = employee.role_id)
    LEFT JOIN department ON (department.id = role.department_id)
    ORDER BY department.name;
    `;
    // query db for above function
    db.query(query, (err, res) => {
        if (err) throw err;
        // setup res as dept-specific items
        const deptName = res.map(data => ({
            value: data.id, name: data.name
        }));
        console.table(res);
        console.log('You found them by dept!\n')
        // call dept-specific inquirer array
        deptOptions(deptName);
    });
};

// deptOptions function to allow user to select desired department to search
function deptOptions(deptName) {
    // establish the array
    inquirer.prompt([
        {
            type: 'list',
            name: 'deptId',
            message: 'Select the department you want to search.',
            choices: deptName
        }
    ])
    .then(function (name) {
        console.log('name', name.deptId);
        const query = `
        SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name AS department
        FROM employee
        JOIN role ON (role.id = employee.role_id)
        JOIN department ON (department.id = role.department_id)
        WHERE department.id = ?
        `;
        // query db for above function
        db.query(query, name.deptId, function (err, res) {
            if (err) throw err;
            console.table(res);
            console.log(res.affectedRows);

            // recall initializeApp function
            initializeApp();
        });
    });
};


// addEmployee function



// removeEmployee function



// updateRole function



// addRole function




module.exports = initializeApp;