import React, {useState, useEffect } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { Card,CardBody,Text,Button,AspectRatio } from '@chakra-ui/react'

const GuestIds = () => {

    const navigate = useNavigate();

    const [guestUsers , setGuestUsers] = useState([]);
    const [formMsg,setFormMsg] = useState('');
    const [isLoading,setLoading] = useState(false)

    const getAllGuestusers = async () => {
        await axios.get(`${import.meta.env.VITE_BASE_URL}/api/v1/user/getguestusers`)
        .then((res) => {
            const allGuestUsers = res.data.allGuestUsers;
            setGuestUsers(allGuestUsers)
        })
        .catch((err) => {
            console.log(err);
            return 
        })
    }

    const loginUser = async (e) => {
        setFormMsg('')
        setLoading(false)
        const username = e.target.id;
        await axios.post(`${import.meta.env.VITE_BASE_URL}/api/v1/user/login` , {username:username , password:"12345678"})
        .then((res)=>{
            console.log(res.data)
            localStorage.setItem("accessToken" , res.data.accessToken)
            localStorage.setItem("user",JSON.stringify(res.data.user))
            localStorage.setItem("userId",res.data.user._id)
            setLoading(false)
            navigate('/')
        })
        .catch((err) => {
            console.log(err);
            setLoading(false)
            setFormMsg("Please try again")
        })
    }

    useEffect( () => {
        getAllGuestusers();
    },[])

  return (
     <div className='flex flex-col w-full my-10 mx-10  '>
        <p className='text-red text-medium text-center'>{formMsg}</p>
        {
            guestUsers.map((user) => (
                <Card key={user._id} className='mb-5'>
                    <CardBody  className='flex flex-row justify-between rounded-md
                        bg-gradient-to-r from-indigo-500 from-10% via-sky-500 via-30% to-emerald-500 to-90%'
                     >
                       <div className='flex flex-row'>
                           <AspectRatio ratio={1/1} className='w-[60px]' >
                            <img src={user.profileImg} className='rounded-full'  alt="img"/>
                          </AspectRatio>
                          <p className='font-medium mt-2 ml-2 text-lg text-yellow-700'>@{user.username}</p>
                       </div>
                       <Button variant='outline'
                         id={user.username}
                         onClick={loginUser}
                        >
                           Login
                       </Button>
                    </CardBody>
                 </Card>
            ))
        }
     </div>
  )
}

export default GuestIds
