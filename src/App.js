import logo from "./logo.svg";
import "./App.scss";
import React from "react";
import { useEffect, useState } from "react";
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
    <div className="hotel-main">

      <div className="search-box">
      <input placeholder="Search Hotel Name ....." className="" type="text" value={searchText} onChange={(e)=>HandleOnChange(e)} />
      </div>
      <div className="Favorites">
        <button>Favorites</button>
      </div>
      <div className="hotel-card-list">
        {hotelData &&
          hotelData.length > 0 &&
          hotelData.map((ele, index) => {
            return (
              <div key={index} className="hotel-card">
                <img className="hotel-imgae" src={ele.image} alt="" />
                <div className="card-other-content">
                  <span className="name">{ele.name}</span>
                  <div className="price">&#x20B9;{ele.price}</div>
                  {ele && ele.freeBreakfast && <span className="free">Free Breakfast</span>}
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default App;
