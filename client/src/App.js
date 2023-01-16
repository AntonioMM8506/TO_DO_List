import React, {useEffect, useState} from 'react';
import {BrowserRouter, Routes, Route } from 'react-router-dom';
import testPage from './testPage';
import AddTask from './addTask';

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
          <Route path='/test' element={<testPage/>} exact></Route>
          <Route path='/addTask' element={<AddTask/>} exact></Route>
        </Routes>
      </BrowserRouter>

    </div>
  );
}//End of App

export default App;