import React from 'react'
import { useParams } from 'react-router-dom'
import Home from './Home';
import './details.scss'
const HotelDetails = () => {

    
const params = useParams();


let test =new URL(window.location.href);
let id = test && test.search && test.search.slice(4).toString()

const HandleIsFaviourate=(id)=>{
  debugger
  let Favrite = localStorage.fav ?? []

    let list =Favrite.length>0 ? JSON.parse(localStorage.getItem('fav'))
    : []
list.push(...list,id)
    localStorage.setItem('fav',JSON.stringify(list))
}

  return (
    <div>
        <Home id={id} isDetails={true} HandleIsFaviourate={()=>HandleIsFaviourate(id)}/>
    </div>
  )
}

export default HotelDetails