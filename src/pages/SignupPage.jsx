import React,{useState} from 'react'
import {Link , useNavigate} from "react-router-dom";
import { Input } from '@chakra-ui/react'
import { Button, ButtonGroup } from '@chakra-ui/react'
import axios from 'axios';

import { loginUser } from '../utils/functions';


function SignUpPage() {
    const signupUrl = `${import.meta.env.VITE_BASE_URL}/api/v1/user/register`
    const navigate = useNavigate();
    const [name , setName] = useState("");
    const [username , setUsername] = useState("");
    const [email , setEmail] = useState("");
    const [password , setPassword] = useState("");
    const [formMsg , setformMsg] = useState("");
    const [isLoading , setLoading] = useState(false);

    
    const signupHandler =async (e) => {
        // creating new user =>
            try {
                const res =  await axios.post(signupUrl , 
                   { name:name,username:username,email:email,password:password }
                ).then((response) => {
                    const data = response.data;
                    const resMsg = response.data.msg;
                    console.log(resMsg);
                    loginUser(data.user.username ,password)
                    navigate('/')
                }).catch((error) => {
                    setformMsg(error.response.data.msg)
                    console.log(error);
                })
            } catch (error) {
                console.log(error);
            }
    }

    const guestLoginHandler = async (e) => {
        e.preventDefault();
        await axios.get(`${import.meta.env.VITE_BASE_URL}/api/v1/user/getguestusers`)
        .then((res) => {
            navigate('/guestids');
        })
        .catch((err) => {
            e.preventDefault();
            console.log(err);
        })
    }

  return (
    <>
        <div className=''>
        <h1 className='font-bold text-3xl mb-2 space-x-0 text-center' >Create your account</h1>
        <p className='text-sm mb-4 text-center'>Welcome! Please enter your detail</p>
        <div onSubmit={signupHandler}>
        <div className='mb-3'>
        <label className='text-sm font-bold' >Name</label>
        <Input placeholder='Name' size='md' onChange={(e) => {setName(e.target.value)}} />
        </div>
        <div className='mb-3'>
        <label className='text-sm font-bold' >Email</label>
        <Input placeholder='email' size='md' onChange={(e) => {setEmail(e.target.value)}} />
        </div>
        <div className='mb-3'>
        <label className='text-sm font-bold' >username</label>
        <Input placeholder='username' size='md' onChange={(e) => {setUsername(e.target.value)}} />
        </div>
        <div className='mb-3'>
        <label className='text-sm font-bold' >Password</label>
        <Input type='password' placeholder='password' size='md' onChange={(e) => {setPassword(e.target.value)}} />
        </div>
        <div className='mb-3 w-full'>
        <Button 
         onClick={signupHandler}
         isLoading = {isLoading}
         loadingText='Submitting'
         className='w-full bg-violet-900' 
         colorScheme='voilet'
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
        <p className='text-sm text-center text-red'>{formMsg}</p>
        </div>
        </div>
        </div>
        <p className='text-sm'>
            Already have an account?
            <Link to='/login' className='text-blue-700'> Log in</Link>
        </p>
    </>
  )
}

export default SignUpPage
