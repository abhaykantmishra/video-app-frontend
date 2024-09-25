
import { useState,useEffect } from 'react';
import { Outlet, useNavigate , Navigate, useLocation } from 'react-router-dom'
import axios from 'axios';

function AuthLayout() {
    const uid = useLocation().pathname.split('/')[2];
    const [isAuthenticate , setAuth] = useState(false)
    const navigate = useNavigate();
    const pathname = window.location.pathname;
    const verifyUrl = `${import.meta.env.VITE_BASE_URL}/api/v1/user/verifyuser`
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
        {isAuthenticate ? (
            <Navigate to='/' />
        ) : (
           <> 
            <div className='flex flex-1 justify-center items-center
            flex-col py-10'>
                <Outlet />
            </div>
            <img 
                src="/assets/images/side-img.jpg" alt="logo"
                className='hidden xl:block h-screen w-1/2 object-cover bg-no-repeat' 
            />
           </> 
        ) 
        }
    </>
  )
}

export default AuthLayout
