// Set the 'Node_ENV' variable
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

// load the modules
const mongoose = require('./config/mongoose'),
express = require('./config/express');

const db = mongoose();


//Create an new Express application instance
const app = express();


app.listen(3000);
console.log('Server running at http://localhost:3000/');
module.exports = app; // return the application object


