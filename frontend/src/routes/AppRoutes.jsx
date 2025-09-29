import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "../screens/Login";
import Register from "../screens/Register";
import Home from "../screens/Home";
import DashboardPage from "../screens/Dashboard";
import Project from "../screens/Project";
import UserAuth from "../auth/UserAuth";
import Help from "../screens/Help";
import Features from "../screens/Features";
import About from "../screens/About";

export const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/login" element={<Login></Login>}></Route>
        <Route path="/register" element={<Register></Register>}></Route>
        <Route
          path="/dashboard"
          element={
            <UserAuth>
              <DashboardPage />
            </UserAuth>
          }
        ></Route>
        <Route
          path="/project"
          element={
            <UserAuth>
              <Project />
            </UserAuth>
          }
        ></Route>
        <Route path="/help" element={<Help />}></Route>
        <Route path="/features" element={<Features />}></Route>
        <Route path="/about" element={<About />}></Route>
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
