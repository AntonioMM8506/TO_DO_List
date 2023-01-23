const express = require('express');
const router = express.Router();

const mongoose = require('mongoose');
const mySchema = mongoose.Schema;

//With Mongoose, and Schema is necessary, in order to standarize the request, so no other
//field will be send.
const taskSchema = new mySchema({
    title: String,
    status: String,
    description: String
}, {collection:'todo_list_collection'});

//Creates the Collection, in case of existing, it will CRUD in that collection
const taskModel = mongoose.model('todo_list_collection', taskSchema);
module.exports = router;

//CRUD Methods --------------------------------------------------------------------------------
//Add new task
router.post('/add', (req, res) => {
    const newTask = new taskModel({
        id: req.body.id,
        title: req.body.title,
        status: req.body.status,
        description: req.body.description
    });
    newTask.save(function(err){
        if(!err){
            res.send('Task Created Succesfully');
        }else{
            res.send(err);
        }
    })
});

//Get All tasks 
router.get('/getTask', (req, res) => {
    taskModel.find({}, function(docs, err){
        if(!err){
            res.send(docs);
        }else{
            res.send(err);
        }
    })
});

//Get data from a single Task
router.post('/getDataTask', (req, res) => {
    taskModel.find({id: req.body._id}, function(docs, err){
        if(!err){
            res.send(docs)
        }else{
            res.send(err);
        }
    })
});

//Update Task
router.post('/update', (req, res) => {
    taskModel.findOneAndUpdate({_id: req.body.id}, {
        title: req.body.title,
        status: req.body.status,
        description: req.body.description
    }, (err) => { 
        if(!err){
            res.send('Task updated')
        }else{
            res.send(err);
        }
    })
});

//Delete Task
router.post('/delete', (req, res) => {
    taskModel.findOneAndDelete({_id: req.body.id}, 
        (err) => {
            if(!err){
                res.send('Task Removed');
            }else{
                res.send(err);
            }
        }
    )
});
