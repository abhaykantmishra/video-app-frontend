import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FormControl,Textarea, FormLabel,Input,Select,Button } from '@chakra-ui/react';
import FileUploader from '../components/forms/FileUploader';
import { GrEdit } from "react-icons/gr";
const EditProfile = () => {
    const navigate = useNavigate();
    const uid = useLocation().pathname.split('/')[2]

    const verifyUrl = `${import.meta.env.VITE_BASE_URL}/api/v1/user/verifyuser`
    const [isCurrentUser,setIsCurrentUSer] = useState(false);

    async function checkIfCurrentUser(){
        if(uid === localStorage.getItem("userId")){
          await axios.post(verifyUrl,{
            token:localStorage.getItem("accessToken") ,
            userId:localStorage.getItem("userId")
          }).then((res)=>{
            if(res.data.msg === "your access token verified"){
              setIsCurrentUSer(true);
              return;
            }else{
              setIsCurrentUSer(false)
              navigate('/')
            }
          }).catch((err)=>{
            setIsCurrentUSer(false);
            navigate('/')
            console.log(err);
          })
        }
    }


    useEffect( ()=>{
        checkIfCurrentUser();
    },[])

    const [isLoading,setLoading] = useState(false);
    const [name,setname] = useState("");
    const [email,setemail] = useState("");
    const [file,setFile] = useState();
    const [formMsg,setFormMsg] = useState("");

    const editUserUrl = `${import.meta.env.VITE_BASE_URL}/api/v1/user/updateprofile`


    async function editHandler(){
        setLoading(true);
        console.log(name , " ",email , " ",file)
        if(!name || !email || !file){
            setLoading(false);
            setFormMsg("Please provide all field")
            console.log("please provide one field")
            e.preventDefault();
            return ;
        }

        await axios.post(editUserUrl,{
            user:localStorage.getItem("user"), name:name.trim() , email:email.trim() , userImg:file
        })
        .then((res) =>{
          setFormMsg("")
           setLoading(false);
           navigate(`/profile/${localStorage.getItem("userId")}`)
           return;
          })
        .catch((err) => {
          setLoading(false);
          navigate(`/profile/${localStorage.getItem("userId")}`)
          console.log(err)
          return
        })

    }
    
    if(!isCurrentUser){
        return (
            <>
            <p>Not logged In user</p>
            </>
        )
    }

  return (
    <>
    <div className='w-full xl:w-[80%] mr-10'>
    <div className=' ml-3 my-5 '>
     <GrEdit className='text-2xl' />
    </div>
    <form className='w-full gap-5' onSubmit={editHandler}>

    <label htmlFor='name'  className='font-medium'>Add Name</label>
    <Input name='tags' className='mb-5'
     onChange={(e) =>{
      setFormMsg('')
      setname(e.target.value)
      }} />

     <label htmlFor='email' className='font-medium'>Add Email</label>
    <Input name='tags' className='mb-5'
     onChange={(e) =>{
      setFormMsg('')
      setemail(e.target.value)}}
    />
   

    <FormControl className='mb-10'>
    <FormLabel >Add photo</FormLabel>
    <Input type='file'
          className='shad-textarea custum-scrollbar p-2'
          placeholder='Tap to Choose file from local'
          variant={'filled'}
          onChange={(e) => {
             setFormMsg('')
             setFile( e.target.files[0])}
          }
    />
    </FormControl>

     <div className='flex gap-4 items-center justify-end'>
        <Button type='button' className='shad-button_dark_4'
        >
            Cancle
        </Button>
        <Button type='submit' onClick={editHandler} className='shad-button_primary whitespace-nowrap'>
            Submit
        </Button>
        <p className='text-red'>{formMsg}</p>
    </div>
     
</form>
</div>
</>
)
}



export default EditProfile
