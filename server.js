const express = require('express');
const db = require('./db/connection');
const inquirer = require('inquirer');
const apiRoutes = require('./routes/api');

const PORT = process.env.PORT || 3007;
const app = express();

// setup middleware
app.use(express.urlencoded({ entended: false }));
app.use(express.json());


// setup api routing and 404 response
app.use('/api', apiRoutes);
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
    inquirer
        .prompt({
            type: 'list',
            name: 'task',
            message: 'What you wanna do, boss?',
            choices: ['View Employees', 'View Employees by Department', 'Add an Employee', 'Remove an Employee', 'Update Role', 'Add Role', 'Terminate Session']
        })
};