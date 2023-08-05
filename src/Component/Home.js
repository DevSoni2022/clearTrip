import "./home.scss";
import React,{useContext} from "react";
import { useEffect, useState } from "react";
import {WishList,BackIcon}  from './SvgStore'
const Home = ({ id, isDetails = false,HandleIsFaviourate }) => {
  const [hotelData, setHotelData] = useState(null);
  const [searchText, setsearchText] = useState("");

  useEffect(() => {
    fetch("https://mocki.io/v1/4775a500-cf31-4bee-8a65-0c849b6e4d0c")
      .then((response) => response.json())
      .then((data) => setHotelData(data));
  }, []);
  const HandleOnChange = (ele) => {
    let text = ele.target.value;
    text = text.toLowerCase();
    setsearchText(text);
    const result =
      searchText &&
      searchText.length > 0 &&
      hotelData.length > 0 &&
      hotelData.filter((ele, index) => {
        return isNaN(searchText)
          ? ele.name.toLowerCase().includes(searchText)
            ? ele
            : ""
          : ele.id.toLowerCase().includes(searchText)
          ? ele
          : "";
      });
    setHotelData(result.length > 0 ? result : hotelData);
  };

  const SortByPrice=()=>{
    let data =hotelData.sort(function(a,b){
        return parseFloat(a.price) - parseFloat(b.price)
    })
    setHotelData(data)
  }

  const BackIcon =<svg width="24" height="24" viewBox="0 0 24 24" fill="none" 
  xmlns="http://www.w3.org/2000/svg"> 
  <path d="M18.2 12H5" stroke="#1A1A1A" stroke-linecap="round" stroke-linejoin="round"/> <path d="M11.5 18.5L5 12L11.5 5.5" stroke="#1A1A1A" stroke-linecap="round" stroke-linejoin="round"/> 
  </svg> 




const sortByFavirte=()=>{
    let Favrite = localStorage.fav
Favrite = JSON.parse(Favrite)

    const result =
      Favrite.length>0 &&
      hotelData.length > 0 &&
      hotelData.filter((ele, index) => {
        return Favrite.includes( ele.id.toLowerCase())
      });
    setHotelData(result.length > 0 ? result : hotelData);
}
  return (
    <>
    {isDetails ?
    <div className="hotel-card-list">
    {hotelData &&
      hotelData.length > 0 &&
      hotelData.map((ele, index) => {
        if(ele.id === id)
        return (
          <a
            href={`/Hotel?id=${ele.id}`}
            key={index}
            className="hotel-card"
          >

            <div className="img-hotel">
                <div className="top-content">
            <a href="/">Back</a>
            <div onClick={HandleIsFaviourate}>
            <WishList/>
            </div>
            </div>
              <img className="hotel-imgae" src={ele.image} alt="" />
              
              {/* <BackIcon/> */}
            </div>
            <div className="card-other-content">
              <span className="name">{ele.name}</span>
              <div className="price">&#x20B9;{ele.price}</div>
              {ele && ele.freeBreakfast && (
                <span className="free">Free Breakfast</span>
              )}
             {isDetails && <div className="details">
                {ele.description}
              </div>
                }
            </div>
          </a>
        );
      })}
  </div>
  :
    <div className="hotel-main">
        <div className="top-content">
      <div className="search-box">
        <input
          placeholder="Search Hotel Name ....."
          className=""
          type="text"
          value={searchText}
          onChange={(e) => HandleOnChange(e)}
        />
      </div>
      <div className="Favorites">
        <button onClick={()=>sortByFavirte()}>Favorites</button>
      </div>
      </div>
      <div className="sort-price">
        <button onClick={()=>SortByPrice()} className="Sort-by-price"> Sort By Price</button>
      </div>
      <div className="hotel-card-list">
        {hotelData &&
          hotelData.length > 0 &&
          hotelData.map((ele, index) => {
            return (
              <a
                href={`/Hotel?id=${ele.id}`}
                key={index}
                className="hotel-card"
              >
                <div className="img-hotel">
                  <img className="hotel-imgae" src={ele.image} alt="" />
                </div>
                <div className="card-other-content">
                  <span className="name">{ele.name}</span>
                  <div className="price">&#x20B9;{ele.price}</div>
                  {ele && ele.freeBreakfast && (
                    <span className="free">Free Breakfast</span>
                  )}
                </div>
              </a>
            );
          })}
      </div>
    </div>
}
    </>
  );
};

export default Home;
