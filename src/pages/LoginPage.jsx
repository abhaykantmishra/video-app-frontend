import React, { useState } from 'react'
import { Input } from '@chakra-ui/react'
import { Button, ButtonGroup } from '@chakra-ui/react'
import { Link,useNavigate } from 'react-router-dom';
import { loginUser } from '../utils/functions';
import axios from 'axios';

function LoginPage() {
    const navigate = useNavigate();
    const loginUrl = "/api/v1/user/login"
    const [email , setEmail] = useState("");
    const [password , setPassword] = useState("");
    const [isLoading , setLoading] = useState(false);

    const loginHandler = async (e) => {
        setLoading(true);
        // console.log(import.meta.env.VITE_BASE_URL)
        await axios.post(`${import.meta.env.VITE_BASE_URL}/api/v1/user/login `, {
            username:email,password:password
        }).then((res)=>{
            localStorage.setItem("accessToken" , res.data.accessToken)
            localStorage.setItem("user",JSON.stringify(res.data.user))
            localStorage.setItem("userId",res.data.user._id)
            setLoading(false);
            navigate('/')
        }).catch((error) => {
            console.log(error);
            console.log("user didn't logged in!")
            setLoading(false);
            navigate('/login')
        })
    }

    const guestLoginHandler = () => {
        navigate('/guestids')
    }

  return (
    <>
        <div className=''>
        <h1 className='font-bold text-3xl mb-2 space-x-0 text-center' >Log in to your account</h1>
        <p className='text-sm mb-4 text-center'>Welcome back! Please enter your detail</p>
        <form onSubmit={loginHandler}>
        <div className='mb-3'>
        <label htmlFor="email"className='text-sm font-bold' >Username or Email</label>
        <Input placeholder='username or email' size='md' onChange={(e) => {setEmail(e.target.value)}}  />
        </div>
        <div className='mb-3'>
        <label htmlFor="password"className='text-sm font-bold' >Password</label>
        <Input type='password' placeholder='password' size='md' onChange={(e) => {setPassword(e.target.value)}} />
        </div>
        <div className='mb-3'>
        <Button 
         isLoading={isLoading }
         loadingText='Submitting'
         className='w-full bg-violet-900' 
         colorScheme='voilet'
         onClick={loginHandler}
        >
            Submit
        </Button>
        <Button 
         onClick={guestLoginHandler}
         isLoading = {isLoading}
         className='w-full mt-3 bg-red' 
         colorScheme='voilet'
         >
           Login with a Guest Id
        </Button>
        </div>
        </form>
        </div>
        <p className='text-sm'>
            Don't have an account?
            <Link to='/signup' className='text-blue-700'> Sign up</Link>
        </p>
    </>
  )
}

export default LoginPage
