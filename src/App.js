import logo from "./logo.svg";
import "./App.scss";
import React from "react";
import {
  BrowserRouter as Router,Routes,Route,useRoutes, json,} from "react-router-dom";
import { useEffect, useState } from "react";
import Home from "./Component/Home";
import HotelDetails from "./Component/HotelDetails";
const App = () => {
  const [hotelData, setHotelData] = useState(null);
  const [searchText,setsearchText] = useState('');
  const fetchData = async () => {
    const response = await fetch(
      "https://mocki.io/v1/4775a500-cf31-4bee-8a65-0c849b6e4d0c"
    );
    return response;
  };
  useEffect(() => {
    fetch("https://mocki.io/v1/4775a500-cf31-4bee-8a65-0c849b6e4d0c")
      .then((response) => response.json())
      .then((data) => setHotelData(data));
  }, []);
  const HandleOnChange=(ele)=>{
    
    let text = ele.target.value;
    text = text.toLowerCase()
    setsearchText(text)
    const result =searchText &&searchText.length>0 && hotelData.length>0 &&
    hotelData.filter((ele,index)=>{
      return isNaN(searchText) ? ele.name.toLowerCase().includes(searchText) ? ele : '' : ele.id.toLowerCase().includes(searchText) ? ele : ''
    });
    setHotelData(result.length>0 ? result : hotelData);
  }
  return (
    <Routes>
      <Route path="/" element={<Home/>} />
      <Route  path="/Hotel" element={<HotelDetails/>} />
    </Routes>
  );
};

export default App;
