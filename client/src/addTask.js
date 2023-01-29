import React, { useState } from 'react';
import uniqid from 'uniqid';
import axios from 'axios';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import { useNavigate } from 'react-router-dom';

function AddTask(){
    //Hooks
    const [title, setTitle] = useState('');
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

    //Navigate to Home page
    const navigate = useNavigate()
    function cancel(){
        navigate("/");
    }


    //Validates the input of new data, in case of error, the HelperText of the fields will
    //automatically change indicating the problem. Also, if there's an error, the submission
    //will be canceled. 
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
                setOpen(false);
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
    }//End of addNewTask


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
                        onClick={()=>{ handleClickOpen(true)}}>
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
            

            <Dialog 
                open={open} 
                keepMounted 
                onClose={handleClose}>
                
                <DialogTitle>Add New Task?</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-slide-description">
                        The task will be added to the queue with Status "Pending"
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button color="success" onClick={addNewtask}>
                        ADD
                    </Button>
                    <Button color="error" onClick={handleClose}>
                        Cancel
                    </Button>
                </DialogActions>

            </Dialog>

        </div>
    );

}//End of AddTask

export default AddTask;
