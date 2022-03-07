const express = require('express');
const db = require('./db/connection');
const apiRoutes = require('./routes');

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
    console.log('Database connected');
    app.listen(PORT, () => {
        console.log(`Server rocking on port ${PORT} like a baller`);
    });
});