import React, { useState } from 'react';
import uniqid from 'uniqid';
import axios from 'axios';
import Alert from '@mui/material/Alert';
//import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';

function AddTask(){
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [showAlert, setShowAlert] = useState(false);

    function addNewtask(){
        var newTask = {
            id: uniqid(),
            title: title,
            status: "new",
            description: description
        }
        console.log(newTask);
        axios.post('/api/task/add', newTask)
        .then(res => {
            setShowAlert(true);
        })
        .then(err => { console.log(err)});
    }

    return(
        <div>
            <div>
                <input value={title} onChange={(e) => {setTitle(e.target.value)}}></input>
                <input value={description} onChange={(e) => {setDescription(e.target.value)}}></input>
                <button onClick={addNewtask}>Add Task</button>
            </div>
            
            {(showAlert) ? 
                <Stack sx={{ width: '100%' }} spacing={2}>
                    <Alert onClose={() => {
                            setShowAlert(false)
                            window.location.reload();
                        }}>
                        New task added correctly
                    </Alert>
                </Stack>
                : 
                null
            }
        </div>
    );
}

export default AddTask;