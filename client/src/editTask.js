import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import axios from 'axios';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

function EditTask(){

    const params = useParams();
    const [title, setTitle] = useState('');
    const [status, setStatus] = useState('');
    const [description, setDescription] = useState('');
    const [showAlert, setShowAlert] = useState(false);
    const [titleHelper, setTitleHelper] = useState('Give yout Task a Name');
    const [titleErr, setTitleErr] = useState(false);
    const [descriptionHelper, setDescriptionHelper] = useState('Type a short and clear Description');
    const [descriptionErr, setDescriptionErr] = useState(false);

    const handleChange = (event) => {
        setStatus(event.target.value);
    };

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
        //console.log(params.id)
        const currentTask = {
            id: params.id,
            title: title,
            status: status,
            description: description
        }
        axios.post('/api/task/update', currentTask)
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
                    <TextField fullWidth error={titleErr} label="Title" id="title" helperText={titleHelper} value={title} onChange={(e) => {setTitle(e.target.value)}}/>
                    <FormControl fullWidth>
                        <InputLabel>Status</InputLabel>
                        <Select value={status} label="Status" onChange={handleChange}>
                            <MenuItem value="Pending">Pending</MenuItem>
                            <MenuItem value="In Progress">In Progress</MenuItem>
                            <MenuItem value="Done">Done</MenuItem></Select>
                    </FormControl>
                    
                    <TextField fullWidth error={descriptionErr} multiline={true} rows={5} label="Description" id="description" helperText={descriptionHelper} value={description} onChange={(e) => {setDescription(e.target.value)}}/>

                </Stack>
                <button sx={{width:200}} onClick={editCurrentTask}>Edit Task</button>
        </div>
    )

}

export default EditTask;