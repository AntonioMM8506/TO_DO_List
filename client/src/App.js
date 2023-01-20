import React, {useEffect, useState} from 'react';
import {BrowserRouter, Routes, Route } from 'react-router-dom';
import AddTask from './addTask';
import ListOfTasks from './listOfTasks';
import EditTask from './editTask';

function App(){
  const [backEndData, setBackEndData] = useState([{}]);
  useEffect(()=>{
    fetch("/api").then(
      response => response.json()
    ).then(
      data =>{
        setBackEndData(data);
      }
    )}, [])

  return(
    <div>

      <BrowserRouter>
        <Routes>
          <Route path='/addTask' element={<AddTask/>} exact></Route>
          <Route path='/list' element={<ListOfTasks/>} exact></Route>
          <Route path='/editTask/:id' element={<EditTask/>} exact></Route>
        </Routes>
      </BrowserRouter>

    </div>
  );
}//End of App

export default App;