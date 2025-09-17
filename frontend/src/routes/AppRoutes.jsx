import React from 'react'
import { BrowserRouter,Route,Routes } from 'react-router-dom'
import Login from '../screens/Login'
import Register from '../screens/Register'

export const AppRoutes = () => {
  return (
    <BrowserRouter>
        <Routes>
            <Route path='/' element={<div>home</div>}></Route>
            <Route path='/login' element={<Login></Login>}></Route>
            <Route path='/register' element={<Register></Register>}></Route>
        </Routes>
    </BrowserRouter>
  )
}

export default AppRoutes