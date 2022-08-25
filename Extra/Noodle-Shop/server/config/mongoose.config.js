const mongoose = require('mongoose');

const mongoEP = 'mongodb://localhost/';
const dbName = 'user';

mongoose
    .connect(mongoEP + dbName)
    .then(() => console.log(`Connecting to ${dbName} db`))
    .catch(err => console.log('Failed connecting to the database ', err));