import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import axios from 'axios';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Button from '@mui/material/Button';
import Select from '@mui/material/Select';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import { useNavigate } from 'react-router-dom';
import './App.css';

function EditTask(){

    //Hooks
    const params = useParams();
    const [title, setTitle] = useState('');
    const [status, setStatus] = useState('');
    const [description, setDescription] = useState('');
    const [titleHelper, setTitleHelper] = useState('Give yout Task a Name');
    const [titleErr, setTitleErr] = useState(false);
    const [descriptionHelper, setDescriptionHelper] = useState('Type a short and clear Description');
    const [descriptionErr, setDescriptionErr] = useState(false);
    const [open, setOpen] = React.useState(false);

    //General methods to handle Dialog box
    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleChange = (event) => {
        setStatus(event.target.value);
    };

    //Navigates to the HomePage
    const navigate = useNavigate()
    function cancel(){
        navigate("/");
    }

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
        });
    },
    // eslint-disable-next-line 
    []);//End of useEffect

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
            setOpen(false);
            //console.log(res);
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
                cancel();
            }
        })
        .catch(err => { console.log(err)});

    }//End of editCurrentTask


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
                    <TextField fullWidth 
                        error={titleErr} 
                        label="Title" 
                        id="title" 
                        helperText={titleHelper}
                        value={title} 
                        onChange={(e) => {setTitle(e.target.value)}}/>
                    <FormControl fullWidth>
                        <InputLabel>Status</InputLabel>
                        <Select value={status} label="Status" onChange={handleChange}>
                            <MenuItem value="Pending">Pending</MenuItem>
                            <MenuItem value="In Progress">In Progress</MenuItem>
                            <MenuItem value="Done">Done</MenuItem></Select>
                    </FormControl>
                    <TextField fullWidth 
                        error={descriptionErr} 
                        multiline={true} 
                        rows={5} 
                        label="Description" 
                        id="description" 
                        helperText={descriptionHelper} 
                        value={description} 
                        onChange={(e) => {setDescription(e.target.value)}}/>

                </Stack>
                <br></br>
                <Stack direction="row" spacing={2}>
                    <Button 
                        variant="contained" 
                        color="success" 
                        sx={{width:200}} 
                        onClick={()=>{handleClickOpen(true)}}>
                        Save
                    </Button>
                    <Button 
                        variant="contained" 
                        color="error" 
                        sx={{width:200}} 
                        onClick={ cancel}> 
                        Cancel
                    </Button>
                </Stack>

            <Dialog 
                open={open} 
                keepMounted 
                onClose={handleClose}>
                
                <DialogTitle>Save the current Changes?</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-slide-description">
                        If the Task Status is changed to "Done", this task cannot be 
                        edited or deleted later.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button color="success" onClick={() => {editCurrentTask()}}>
                        SAVE
                    </Button>
                    <Button color="error" onClick={handleClose}>
                        Cancel
                    </Button>
                </DialogActions>

            </Dialog>
        </div>
    )//End of render

}//End of EditTask

export default EditTask;