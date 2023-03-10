const express = require('express');
const app = express();

//Database Connection
const mongoDBConnection = require('./connection');

//Task Model
const taskRoute = require('./task');

//body parser, used to read from the body to send the request
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: 'true'}));

app.use('/api/task', taskRoute);

//Request used to test the Connection to the DB
app.get("/api", (req, res) => {
    res.json([{id:1, title: "connect frontend with backend", description: "Connect ExpressJS with ReactJS"}]);

});

app.listen(5000,() => console.log("Server started on port 5000") );
