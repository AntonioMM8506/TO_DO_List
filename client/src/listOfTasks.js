import {useState, useEffect, useRef} from 'react';
import axios from 'axios';
import IndividualTask from './individualTask';
import Button from '@mui/material/Button';

function ListOfTasks(){
    const [dataTask, setDataTask] = useState([]);
    const [penTsk, setPenTsk] = useState([]);
    const [inProTsk, setInProTsk] = useState([]);
    const [doneTsk, setDoneTesk] = useState([]);
    const [countInProgress, setCountInProgress] = useState(0);
    const [countPending, setCountPending] = useState(0);
    const [countDone, setCountDone] = useState(0);

    useEffect(()=>{
        axios.get('api/task/getTask')
        .then( res => {
            console.log(res.data);
            setDataTask(res.data);

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

            //console.log(auxPen);
            //console.log(auxInP);
            //console.log(auxDone);

            setPenTsk(auxPen);
            setCountPending(auxPen.length);
            setInProTsk(auxInP);
            setCountInProgress(auxInP.length);
            setDoneTesk(auxDone);
            setCountDone(auxDone.length);

        }).catch( err => {
            console.log(err);
        })
    }, []);

    //Map list into object
    const taskList = dataTask.map(id => {
        return(
            <div>
                <IndividualTask id={id}></IndividualTask>
            </div>
        )
    })

    const pendingTasks = penTsk.map((id, index) => {
        return(
            <div>
                <IndividualTask id={id}></IndividualTask>
            </div>
            
        )
    });
    
    const inProgressTasks = inProTsk.map(id => {
        return(
            <div>
                <IndividualTask id={id}></IndividualTask>
            </div>
        )
    })

    const doneTasks = doneTsk.map(id => {
        return(
            <div>
                <IndividualTask id={id}></IndividualTask>
            </div>
        )
    })

    return(
        <div>
            <Button>Pending</Button>
            <Button>In Progress</Button>
            <Button>Done</Button>
            {taskList}
        </div>
    )
}

export default ListOfTasks;