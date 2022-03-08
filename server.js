const express = require('express');
const db = require('./db/connection');
const initializeApp = require('./routes/index');

const PORT = process.env.PORT || 3007;
const app = express();

// setup middleware
app.use(express.urlencoded({ entended: false }));
app.use(express.json());
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
    ───────║║──────╔═╝║──Boss Style *$*$*───╔═╝║
    ───────╚╝──────╚══╝─────────────────────╚══╝
    `)

    // call function to start app
    initializeApp();
});
