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
function addEmployee() {
    const query = `
    SELECT role.id, role.title, role.salary
    FROM role
    `;
    // query db for above function
    db.query(query, function (err, res) {
        if (err) throw err;
        // set object for role-specific responses
        const roleName = res.map(({ id, title, salary }) => ({
            value: id, title: `${title}`, salary: `${salary}`
        }));
        console.table(res);
        console.log('You want a role?\n');
        // setup call for role-specific inquirer array
        roleOptions(roleName);
    });
};

// roleOptions function to allow user to select desired role to search
function roleOptions(roleName) {
    // establish the array
    inquirer.prompt([
        {
            type: 'input',
            name: 'first_name',
            message: 'Enter employee first name'
        },
        {
            type: 'input',
            name: 'last_name',
            message: 'Enter employee last name'
        },
        {
            type: 'list',
            name: 'roleId',
            message: 'Select employee role:',
            choices: roleName
        }
    ])
    .then(function (name) {
        console.log(name);
        const query = `
        INSERT INTO employee SET ?
        `;
        // push new employee info into db
        db.query(query, { 
            first_name: name.first_name,
            last_name: name.last_name,
            role_id: name.roleId,
            manager_id: name.managerId
        },
        function (err, res) {
            if (err) throw err;
            console.table(res);
            console.log('You added an employee!\n')
            // recall initializeApp function
            initializeApp();
        });
    });
};

// removeEmployee function
function removeEmployee() {
    const query = `
    SELECT employee.id, employee.first_name, employee.last_name
    FROM employee
    `;
    // query the db for employee
    db.query(query, function (err, res) {
        if (err) throw err;
        const deleteName = res.map(({ id, first_name, last_name }) => ({
            value: id, name: `${id} ${first_name} ${last_name}`
        }));
        console.table(res);
        console.log('Get ready to delete..\n');
        // setup call to find employee to delete inquirer array 
        deleteOptions(deleteName);
    });
};

// deleteOptions function to allow user to select employee for deletion
function deleteOptions(deleteName) {
    // establish the array
    inquirer.prompt([
        {
            type: 'list',
            name: 'employeeId',
            message: 'Select employee to delete:',
            choices: deleteName
        }
    ])
    .then(function (name) {
        const query = `
        DELETE FROM employee WHERE ?
        `;
        // push deleted info to db
        db.query(query, { id: name.employeeId }, function (err, res) {
            if (err) throw err;
            console.table(res);
            console.log('That employee sucked anyway');
            // recall initializeApp function
            initializeApp();
        });
    });
};


// updateRole function



// addRole function




module.exports = initializeApp;