import React from 'react'
import { BrowserRouter,Route,Routes } from 'react-router-dom'
import Login from '../screens/Login'
import Register from '../screens/Register'
import Nav from '../screens/Nav'
import Home from '../screens/Home'

export const AppRoutes = () => {
  return (
    <BrowserRouter>
        <Nav/>
        <Routes>
            <Route path='/' element={<Home/>}></Route>
            <Route path='/login' element={<Login></Login>}></Route>
            <Route path='/register' element={<Register></Register>}></Route>
        </Routes>
    </BrowserRouter>
  )
}

export default AppRoutes