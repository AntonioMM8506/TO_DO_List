import react, { useState, useEffect } from 'react';
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
      console.log(res.data);
      //alert(res.data);
      Swal.fire('Task Deleted', 'Task Deleted')
      ref(0); //Refresh the current page at the current point
      //ref('/'); //navigate to the index page
    }).catch(err => console.log(err));
  }

  useEffect(()=>{
    AOS.init();
  },[])


  return(
    <diV>
    <div data-aos="flip-right">
      <Box sx={{ width: '100%', maxWidth: 460, bgcolor: 'grey' }}>
        <Box sx={{ my: 3, mx: 2 }}>
          <Grid container alignItems="center">
            <Grid item xs>
              <Typography gutterBottom variant="h4" component="div" noWrap>
                {id.title}
              </Typography>
            </Grid>
            <Grid item>
              <Typography gutterBottom variant="h6" component="div">
                {id.status}
              </Typography>
            </Grid>
          </Grid>
          <Typography sx={{maxWidth:300}} color="text.secondary" variant="body2" noWrap>
            {id.description}
          </Typography>
        </Box>
        <Divider variant="middle" />
        <Box sx={{ m: 2 }}>

          <Stack direction="row" spacing={1}>
            <Link to={`/editTask/${id._id}`}><Button>Edit</Button></Link>
            <Button onClick={()=>{deleteTask(id._id)}} >Delete</Button>
          </Stack>
        </Box>
      </Box>
    </div>
    </diV>
  )
}

export default IndividualTask;