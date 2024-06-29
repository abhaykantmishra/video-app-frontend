import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FormControl,Textarea, FormLabel,Input,Select,Button } from '@chakra-ui/react';
import FileUploader from '../components/forms/FileUploader';
import { GrEdit } from "react-icons/gr";
const EditProfile = () => {
    const navigate = useNavigate();
    const uid = useLocation().pathname.split('/')[2]

    const verifyUrl = 'https://video-app-backend-s7qn.onrender.com/api/v1/user/verifyuser'
    const [isCurrentUser,setIsCurrentUSer] = useState(false);

    async function checkIfCurrentUser(){
        if(uid === localStorage.getItem("userId")){
          await axios.post(verifyUrl,{
            token:localStorage.getItem("accessToken") ,
            userId:localStorage.getItem("userId")
          }).then((res)=>{
            if(res.data.msg === "your access token verified"){
              setIsCurrentUSer(true);
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

    const [name,setname] = useState("");
    const [email,setemail] = useState("");
    const [file,setFile] = useState();
    const [formMsg,setFormMsg] = useState("");

    const editUserUrl = "https://video-app-backend-s7qn.onrender.com/api/v1/user/updateprofile"


    async function editHandler(){
        console.log(name , " ",email , " ",file)
        if(!name && !email && !file){
            setFormMsg("Atleast provide one field")
            console.log("Atleast provide one field")
            return ;
        }

        await axios.post(editUserUrl,{
            user:localStorage.getItem("user"), name:name , email:email , userImg:file
        })
        .then((res) => console.log(res.data))
        .catch((err) => console.log(err))

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

    <label  className='font-medium'>Add Name</label>
    <Input name='tags' className='mb-5'
     onChange={(e) =>setname(e.target.value)} />

     <label className='font-medium'>Add Email</label>
    <Input name='tags' className='mb-5'
     onChange={(e) =>setemail(e.target.value)} />
   

    <FormControl className='mb-10'>
    <FormLabel >Add photo</FormLabel>
    <Input type='file'
          className='shad-textarea custum-scrollbar p-2'
          placeholder='Tap to Choose file from local'
          variant={'filled'}
          onChange={(e) => setFile( e.target.files[0])}
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
    </div>
     
</form>
</div>
</>
)
}



export default EditProfile