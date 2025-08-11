import React from 'react'
import Home from './assets/components/Home'
import { Routes,Route } from 'react-router-dom'
import TaskDetails from './assets/components/TaskDetails'
const App = () => {
  return (
    <>
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/:id' element={<TaskDetails/>}/>
    </Routes>
    </>
  )
}

export default App

