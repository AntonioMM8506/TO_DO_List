import  { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import { Link, useNavigate } from 'react-router-dom';
import AOS from 'aos';
import 'aos/dist/aos.css';
import axios from 'axios';
import Swal from 'sweetalert2';


function IndividualTask({id}){

  const ref = useNavigate();
  function deleteTask(id){
    axios.post('/api/task/delete', {id: id}).then( res => {
      //console.log(res.data);
      Swal.fire('Task Deleted', 'Task Deleted')
      ref(0); //Refresh the current page at the current point
    }).catch(err => console.log(err));
  }//End of deleteTask


  useEffect(()=>{
    AOS.init();
  },[]);

  function editNavigate(){
    ref(`/editTask/${id._id}`);
  }

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
              <Button variant="contained" color="success" onClick={editNavigate} >Edit</Button>
              <Button variant="contained" color="error" onClick={()=>{deleteTask(id._id)}} >Delete</Button>
            </Stack>
          }
          <br/>
          </Box>
        </Box>
      </div>
    </div>

  )//End of render

}//End of class

export default IndividualTask;
