const express = require('express');
const db = require('./db/connection');
const apiRoutes = require('./routes');

const port = process.env.PORT || 3007;
const app = express();

// setup middleware
app.use(express.urlencoded({ entended: false }));
app.use(express.json());

// setup api routing
app.use('/api', apiRoutes);

// setup server connection following database connect
db.connect(err => {
    if (err) throw err;
    console.log('Database connected');
    app.listen(PORT, () => {
        console.log(`Server rocking on ${PORT}`);
    });
});