const express = require('express');
const db = require('./db/connection');
const inquirer = require('inquirer');
const routes = require('./routes');

const PORT = process.env.PORT || 3007;
const app = express();

// setup middleware
app.use(express.urlencoded({ entended: false }));
app.use(express.json());


// setup api routing and 404 response
app.use(routes);
app.use((req, res) => {
    res.status(404).end();
});

// setup server connection following database connect
db.connect(err => {
    if (err) throw err;
    console.log(`$$$ Server rocking on port ${PORT} like a baller $$$`);
    app.listen(PORT, () => {
    });
    console.log(`
    ╔═══╗─────╔╗──────────────╔═╗╔═╗
    ║╔══╝─────║║──────────────║║╚╝║║
    ║╚══╦╗╔╦══╣║╔══╦╗─╔╦══╦══╗║╔╗╔╗╠══╦═╗╔══╦══╦══╦═╗
    ║╔══╣╚╝║╔╗║║║╔╗║║─║║║═╣║═╣║║║║║║╔╗║╔╗╣╔╗║╔╗║║═╣╔╝
    ║╚══╣║║║╚╝║╚╣╚╝║╚═╝║║═╣║═╣║║║║║║╔╗║║║║╔╗║╚╝║║═╣║
    ╚═══╩╩╩╣╔═╩═╩══╩═╗╔╩══╩══╝╚╝╚╝╚╩╝╚╩╝╚╩╝╚╩═╗╠══╩╝
    ───────║║──────╔═╝║─────────────────────╔═╝║
    ───────╚╝──────╚══╝─────────────────────╚══╝
    `)

    // call function to start app
    initializeApp();
});

// initialize app inquirer prompts
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