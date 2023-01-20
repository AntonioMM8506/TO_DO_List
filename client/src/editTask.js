import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import axios from 'axios';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

function EditTask(){

    const params = useParams();
    const [title, setTitle] = useState('');
    const [status, setStatus] = useState('');
    const [description, setDescription] = useState('');
    const [showAlert, setShowAlert] = useState(false);

    useEffect(()=>{
        axios.post('/api/task/getDataTask', {id: params.id})
        .then( res =>{
            //console.log(".........", params.id);
            let dataRow = {}
            for(let i=0; i<res.data.length; i++){
                if(res.data[i]._id === params.id){
                    dataRow = res.data[i];
                }
            }

            const retrievedDataTask = dataRow;
            setTitle(retrievedDataTask.title);
            setStatus(retrievedDataTask.status);
            setDescription(retrievedDataTask.description);
        })
    },[]);

    function editCurrentTask(){
        console.log(params.id)
        const currentTask = {
            id: params.id,
            title: title,
            status: status,
            description: description
        }
        //console.log(newTask);
        axios.post('/api/task/update', currentTask)
        .then(res => {
            setShowAlert(true);
        })
        .then(err => { console.log(err)});
    }

    return(
        <div>
            <h2>Edit Task</h2>
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
                    <TextField fullWidth multiline={true} rows={5} label="Status" id="status" value={status} onChange={(e) => {setStatus(e.target.value)}}/>
                    <TextField fullWidth multiline={true} rows={5} label="Description" id="description" value={description} onChange={(e) => {setDescription(e.target.value)}}/>

                </Stack>
                <button sx={{width:200}} onClick={editCurrentTask}>Edit Task</button>
        </div>
    )

}

export default EditTask;