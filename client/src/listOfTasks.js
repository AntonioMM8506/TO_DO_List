import react, {useState, useEffect} from 'react';
import axios from 'axios';
import IndividualTask from './individualTask';

function ListOfTasks(){
    const [dataTask, setDataTask] = useState([]);

    useEffect(()=>{
        axios.get('api/task/getTask')
        .then( res => {
            console.log(res.data);
            setDataTask(res.data)
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

    return(
        <div>
            {taskList}
        </div>
    )
}

export default ListOfTasks;