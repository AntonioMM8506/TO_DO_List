const mongoose = require('mongoose');
require('dotenv').config();
mongoose.connect(process.env.ATLAS_URI);

const objectbd = mongoose.connection;

objectbd.on('connected', () => { console.log("Correct Connection")});
objectbd.on('error', () => { console.log("Wrong Connection")});

module.exports = mongoose;