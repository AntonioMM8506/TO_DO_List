import {useState, useEffect, useRef} from 'react';
import axios from 'axios';
import IndividualTask from './individualTask';
import Button from '@mui/material/Button';
import { Stack } from '@mui/system';
import { Pagination } from '@mui/material';
import { Navigate, useNavigate } from 'react-router-dom';
import './App.css';

function ListOfTasks(){
    //const [dataTask, setDataTask] = useState([]);
    const [penTsk, setPenTsk] = useState([]);
    const [inProTsk, setInProTsk] = useState([]);
    const [doneTsk, setDoneTesk] = useState([]);
    const [countInProgress, setCountInProgress] = useState(0);
    const [countPending, setCountPending] = useState(0);
    const [countDone, setCountDone] = useState(0);
    const [showPending, setShowPending] = useState(true);
    const [showInProgress, setShowInProgress] = useState(false);
    const [showDone, setShowDone] = useState(false);


    useEffect(()=>{
        axios.get('api/task/getTask')
        .then( res => {
            console.log(res.data);
            //setDataTask(res.data);

            let auxPen =[];
            let auxInP = [];
            let auxDone = [];

            for(let i=0; i<res.data.length; i++){
                if(res.data[i].status==="Pending"){
                    auxPen.push(res.data[i]);
                }else if(res.data[i].status ==="In Progress"){
                    auxInP.push(res.data[i]);
                }else if(res.data[i].status ==="Done"){
                    auxDone.push(res.data[i]);
                }
            }

            setPenTsk(auxPen);
            setCountPending(auxPen.length);
            setInProTsk(auxInP);
            setCountInProgress(auxInP.length);
            setDoneTesk(auxDone);
            setCountDone(auxDone.length);

        }).catch( err => {
            console.log(err);
        })
    }, []);//End of useEffect

    
    /*
    //Show all elements in the collection
    const taskList = dataTask.map(id => {
        return(
            <div>
                <IndividualTask id={id}></IndividualTask>
            </div>
        )
    })
    */

    const navigate = useNavigate()
    function addNew(){
        navigate("/addTask");
    }


    const [page, setPage] = useState(1);
    const handlePageChange = (event, value) => { setPage(value); };
    //penTsk, countPending
    //inProTsk, countInProgress
    //doneTsk, countDone
    /**
     * @param {array} tsk - array of objects with the data response 
     * @param {int} counter - number of elements in the given array
     * @returns 
     */
    const displayedTasks = (tsk, counter) => {
        let pages = Math.ceil(counter/15);
        let tempArr = [];

        try{
            tempArr = tsk.slice((page-1)*15, (page*15)-1)
        }catch{
            tempArr = tsk.slice((page-1)*15, tsk.length);
        }
        
        return(
            <div>
                <Stack spacing={2} alignItems="center">
                    <Pagination count={pages} page={page} color="primary" onChange={handlePageChange}/>
                </Stack> 
                {
                    tempArr.map(id => {
                        return(
                            <div>
                                <IndividualTask id={id}></IndividualTask>
                            </div>
                        );
                    })
                }
                <Stack spacing={2} alignItems="center">
                <Pagination count={pages} page={page} color="primary" onChange={handlePageChange}/>
                </Stack> 
            </div>
        );
    } //End of pendingTasks


    return(
        <div>
            <h1>TO DO LIST</h1>
            
            <Stack spacing={3} alignItems="center">
                <Button 
                    sx={{width:300}}
                    variant="contained" 
                    spacing={2}
                    size="large" 
                    onClick={addNew}>
                    Add New Task
                </Button>
                
                <Stack direction="row" spacing={2} alignItems="center">
                    <Button sx={{width:200}}  variant="outlined" color="error" onClick={() => {
                        setShowPending(true);
                        setShowInProgress(false);
                        setShowDone(false);
                    }}>Pending</Button>
                    <Button sx={{width:200}}  variant="outlined" color="secondary" onClick={()=> {
                        setShowPending(false);
                        setShowInProgress(true);
                        setShowDone(false);
                    }}>In Progress</Button>
                    <Button sx={{width:200}} variant="outlined" color="success" onClick={() => {
                        setShowPending(false);
                        setShowInProgress(false);
                        setShowDone(true);
                    }}>Done</Button>
                </Stack>
            </Stack>
            
            {showPending ? <h2 className='pendingTitle'>Pending Tasks</h2>: null}
            {showInProgress ? <h2 className='inProgressTitle'>Tasks in Progress</h2>: null}
            {showDone ? <h2 className='doneTitle'>Tasks completed</h2>: null}

            <Stack alignItems="center">
                {showPending ?  countPending ? displayedTasks(penTsk, countPending): <p className='noData'>No Tasks in this Status</p> : null}
                {showInProgress ? countInProgress ?  displayedTasks(inProTsk, countInProgress): <p className='noData'>No Tasks in this Status</p> : null}
                {showDone ? countDone ? displayedTasks(doneTsk, countDone): <p className='noData'>No Tasks in this Status</p> : null}
            </Stack>
            
            <br></br>
        </div>
    )

}//End of ListOfTasks

export default ListOfTasks;