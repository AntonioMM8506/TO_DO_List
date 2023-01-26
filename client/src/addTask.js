import React, { useState } from 'react';
import uniqid from 'uniqid';
import axios from 'axios';
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Navigate, useNavigate } from 'react-router-dom';

function AddTask(){
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [showAlert, setShowAlert] = useState(false);
    const [titleHelper, setTitleHelper] = useState('Give yout Task a Name');
    const [titleErr, setTitleErr] = useState(false);
    const [descriptionHelper, setDescriptionHelper] = useState('Type a short and clear Description');
    const [descriptionErr, setDescriptionErr] = useState(false);


    function addNewtask(){
        var newTask = {
            id: uniqid(),
            title: title,
            status: "Pending",
            description: description
        }
        axios.post('/api/task/add', newTask)
        .then(res => {
            console.log(res);
            if(res.data.errors){
                if(res.data.errors.title){
                    setTitleHelper(res.data.errors.title.message);
                    setTitleErr(true);
                }else{
                    setTitleHelper('Give Your Task a Name');
                    setTitleErr(false);
                }

                if(res.data.errors.description){
                    setDescriptionHelper(res.data.errors.description.message);
                    setDescriptionErr(true);
                }else{
                    setDescriptionHelper('Type a short and clear Description');
                    setDescriptionErr(false);
                }

            }else{
                setShowAlert(true);
            }
        })
        .catch(err => { console.log(err)});
    }//End of addNewTask


    const navigate = useNavigate()
    function cancel(){
        navigate("/");
    }


    return(
        <div>
            <h2>Create a new Task</h2>
            <div>
                <Stack
                    component="form"
                    sx={{
                        width: 500,
                    }}
                    spacing={2}
                    noValidate
                    autoComplete="off">
                        <TextField 
                            fullWidth 
                            error={titleErr} 
                            label="Title" 
                            helperText={titleHelper} 
                            value={title} 
                            onChange={(e) => {setTitle(e.target.value)}}/>
                        <TextField 
                            fullWidth 
                            error={descriptionErr} 
                            multiline={true} 
                            rows={5} 
                            label="Description" 
                            helperText={descriptionHelper} 
                            value={description} 
                            onChange={(e) => {setDescription(e.target.value)}}/>
                </Stack>
                <br></br>
                <Stack direction="row" alignItems="center" spacing={2}>
                    <Button 
                        variant="contained" 
                        color="success" 
                        sx={{width:200}} 
                        onClick={addNewtask}>
                        Create Task
                    </Button>
                    <Button 
                        variant="contained" 
                        color="error" 
                        sx={{width:200}} 
                        onClick={cancel}> 
                        Cancel
                    </Button>
                </Stack>
                
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