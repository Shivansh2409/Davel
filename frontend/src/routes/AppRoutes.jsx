import React from 'react'
import { BrowserRouter,Route,Routes } from 'react-router-dom'

export const AppRoutes = () => {
  return (
    <BrowserRouter>
        <Routes>
            <Route path='/' element={<div>home</div>}></Route>
        </Routes>
    </BrowserRouter>
  )
}

export default AppRoutes