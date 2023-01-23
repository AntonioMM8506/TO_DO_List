const mongoose = require('mongoose');
require('dotenv').config();

//Reads the URL for the MongoDB connection.
//In case of using the cloud service
//mongodb+srv://"Username":"Password".mongodb.net/?retryWrites=true&w=majority
//In case of using a local (Docker) service
//mongodb://mongodb:20000/my_database
mongoose.connect(process.env.ATLAS_URI);

const objectbd = mongoose.connection;

objectbd.on('connected', () => { console.log("Correct MongoDB Connection")});
objectbd.on('error', () => { console.log("Wrong MongoDB Connection")});

module.exports = mongoose;