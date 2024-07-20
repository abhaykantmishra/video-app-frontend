import React from 'react'
import { Outlet,useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Sidebar from '../components/Sidebar'
import { useState,useEffect } from 'react'
import axios from 'axios'

function RootLayout() {
  const [isAuthenticate , setAuth] = useState(false)
  const navigate = useNavigate();
  const pathname = window.location.pathname;
  const verifyUrl = "https://video-app-backend-s7qn.onrender.com/api/v1/user/verifyuser"
  useEffect( ()=>{
    const token = localStorage.getItem("accessToken");
    const userId = localStorage.getItem("userId");
    if(!token || !userId){
      navigate('/login')
    }
    axios.post(verifyUrl,{token:token , userId:userId})
    .then((res)=>{
      navigate(`${pathname}`);
      setAuth(true);
    }).catch((err)=>{
      console.log(err);
      navigate('/login')
    })
  },[])
  return (
    <>
    
    <div className='w-full flex flex-wrap'>
      <Navbar/>
      <Sidebar/>
      <section className='flex flex-1 h-full ml-2'>
        <Outlet/>
      </section>
    </div>
    </>
  )
}

export default RootLayout
