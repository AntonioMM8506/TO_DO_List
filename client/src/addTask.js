import React, { useState } from 'react';
import uniqid from 'uniqid';
import axios from 'axios';
import Alert from '@mui/material/Alert';
//import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';

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
        //console.log(newTask);
        axios.post('/api/task/add', newTask)
        .then(res => {
            setShowAlert(true);
        })
        .then(err => { console.log(err)});
    }

    return(
        <div>
            <div>
                <Stack
                    component="form"
                    sx={{
                        width: 500,
                    }}
                    spacing={2}
                    noValidate
                    autoComplete="off"
                >
                    <TextField fullWidth label="Title" id="title" value={title} onChange={(e) => {setTitle(e.target.value)}}/>
                    <TextField fullWidth multiline={true} rows={5} label="Description" id="description" value={description} onChange={(e) => {setDescription(e.target.value)}}/>
                    
                </Stack>
                <button sx={{width:200}} onClick={addNewtask}>Create New Task</button>
                
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