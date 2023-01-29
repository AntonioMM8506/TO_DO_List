//React Hooks
import  { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
//Axios for making petitions to the backend
import axios from 'axios';
//MUI library components
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
//AOS Library for animation effects
import AOS from 'aos';
import 'aos/dist/aos.css';
import Swal from 'sweetalert2';


function IndividualTask({id}){
    //General methods to handle Dialog box
    const [open, setOpen] = useState(false);
    const [openModal, setOpenModal] = useState(false);

    const handleClickOpen = () => {
      setOpen(true);
    };

    const handleClose = () => {
      setOpen(false);
    };

    const handleModalOpen = () =>{
      setOpenModal(true);
    }
    
    const handleModalClose = () =>{
      setOpenModal(false);
    }

  //Delete the selected task and then redirects to the Home Page
  const ref = useNavigate();
  function deleteTask(id){
    axios.post('/api/task/delete', {id: id}).then( res => {
      //console.log(res.data);
      Swal.fire('Task Deleted', 'Task Deleted')
      ref(0); //Refresh the current page at the current point
    }).catch(err => console.log(err));
  }//End of deleteTask


  //Render the elements using the AOS library effects
  useEffect(()=>{
    AOS.init();
  },[]);


  //Redirects to the EditTask Page, however, each page its created with the data of the
  //selected page, that's why the _id is required.
  function editNavigate(){
    ref(`/editTask/${id._id}`);
  }


  //Render the task box according to its Status
  let statusColor = 'black'
  if(id.status === "Pending"){
    statusColor="#e67171";
  }
  if(id.status === "In Progress"){
    statusColor="indigo";
  }
  if(id.status === "Done"){
    statusColor="green";
  }


  return(
    <div>
      <div data-aos="flip-right">
        <Box sx={{ width: '100%', bgcolor: statusColor, maxHeight:400 }}>
          <Box sx={{ my: 3, mx: 2 }}>
            <Grid container alignItems="center">
              <Grid item xs>
                <Typography gutterBottom variant="h4" component="div" noWrap>
                  {id.title}
                </Typography>
              </Grid>
              <Grid item>
                <Typography gutterBottom variant="h7" component="div">
                  {id.status}
                </Typography>
              </Grid>
            </Grid>
            <Typography sx={{maxWidth:400, maxHeight:300}} variant="body2" noWrap>
              {id.description}
            </Typography>
          </Box>
          <Divider variant="middle" />
          <Box sx={{ m: 2 }}>

          {
            (id.status === "Done") ? null : 
            <Stack direction="row" spacing={1}>
              <Button                 
                variant="contained" 
                color="secondary" 
                onClick={()=>{handleModalOpen(true)}} >
                Show Info
              </Button>

              <Button 
                variant="contained" 
                color="success" 
                onClick={editNavigate} >
                Edit
              </Button>

              <Button 
                variant="contained" 
                color="error" 
                onClick={()=>{handleClickOpen(true)}} >
                Delete
              </Button>

            </Stack>
          }
          <br/>
          </Box>
        </Box>
      </div>
        
        {/*Dialog for the DELETE confirmation*/}
        <Dialog 
          open={open} 
          keepMounted 
          onClose={handleClose}>
          <DialogTitle>Are you sure you want to DELETE this task?</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-slide-description">
              This action cannot be undone
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button color="success" onClick={() => {deleteTask(id._id)}}>
              DELETE
            </Button>
            <Button color="error" onClick={handleClose}>
              Cancel
            </Button>
          </DialogActions>
        </Dialog>

        {/*Dialog for displaying the information of the selected task*/}
        <Dialog 
          open={openModal} 
          keepMounted 
          onClose={handleModalClose}>
          <DialogTitle>{id.title}</DialogTitle>
          <DialogContent>
            <DialogContentText fontWeight="bold">
              Status: {id.status}
            </DialogContentText>
            <br></br>
            <DialogContentText id="alert-dialog-slide-description">
              {id.description}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button color="error" onClick={handleModalClose}>
              Close
            </Button>
          </DialogActions>
        </Dialog>

    </div>

  );

}//End of class


export default IndividualTask;
