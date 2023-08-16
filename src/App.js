import logo from "./logo.svg";
import "./App.scss";
import React from "react";
import {
  BrowserRouter as Router,Routes,Route,useRoutes, json,} from "react-router-dom";
import { useEffect, useState } from "react";
import Home from "./Component/Home";
import HotelDetails from "./Component/HotelDetails";
const App = () => {
  
  return (
    <Routes>
      <Route path="/" element={<Home/>} />
      <Route  path="/Hotel" element={<HotelDetails/>} />
    </Routes>
  );
};

export default App;
