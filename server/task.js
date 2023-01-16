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
})