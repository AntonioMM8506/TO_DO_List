import {useState, useEffect, useRef} from 'react';
import axios from 'axios';
import IndividualTask from './individualTask';
import Button from '@mui/material/Button';
import { Stack } from '@mui/system';
import { Pagination } from '@mui/material';

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
                <Stack spacing={2}>
                    <Pagination count={pages} page={page} onChange={handlePageChange}/>
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
                <Stack spacing={2}>
                    <Pagination count={pages} page={page} onChange={handlePageChange}/>
                </Stack> 
            </div>
        );
    } //End of pendingTasks


    return(
        <div>
            <Button onClick={() => {
                setShowPending(true);
                setShowInProgress(false);
                setShowDone(false);
            }}>Pending</Button>
            <Button onClick={()=> {
                setShowPending(false);
                setShowInProgress(true);
                setShowDone(false);
            }}>In Progress</Button>
            <Button onClick={() => {
                setShowPending(false);
                setShowInProgress(false);
                setShowDone(true);
            }}>Done</Button>

            {showPending ? displayedTasks(penTsk, countPending) : null}
            {showInProgress ? displayedTasks(inProTsk, countInProgress) : null}
            {showDone ? displayedTasks(doneTsk, countDone) : null}
            <br></br>
        </div>
    )

}//End of ListOfTasks

export default ListOfTasks;