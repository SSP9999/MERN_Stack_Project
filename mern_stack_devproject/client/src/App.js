import React from "react";
import {BrowserRouter,Route, Routes } from "react-router-dom";
import Home from "./components/home";
import Register from "./components/signup";
import Signin from "./components/signin";
import Dashboard from "./components/dashboard";


function App() {
  return (
    <div className="App">

        <Routes>
            <Route path="/" index element={<Home/>}/>
            <Route path="/home" element={<Home/>}/>
            <Route path="/signup" element={<Register/>}/>
            <Route path="/signin" element={<Signin/>}/>
            <Route path="/dashboard" element={<Dashboard/>}/>
        </Routes>
      
     
      
    </div>
  );
}

export default App;
