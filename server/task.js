const express = require('express');
const router = express.Router();

const mongoose = require('mongoose');
const mySchema = mongoose.Schema;

const taskSchema = new mySchema({
    title: String,
    status: String,
    description: String
}, {collection:'todo_list_collection'});

const taskModel = mongoose.model('todo_list_collection', taskSchema);
module.exports = router;

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

//Get Data Task
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
//Add new task
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