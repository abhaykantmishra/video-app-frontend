import {
    FormControl,
    FormLabel,
    FormErrorMessage,
    FormHelperText,
    Textarea,
    Button,
    Input,Select
  } from '@chakra-ui/react'

import axios from 'axios';
import { useNavigate } from 'react-router-dom' 
import FileUploader from './FileUploader'
import { useEffect, useState } from 'react';

function PostForm( {post} ) {
    const navigate = useNavigate();
    const pathname = window.location.pathname;
    const uploadVideoUrl = "https://video-app-backend-s7qn.onrender.com/api/v1/video/uploadvideo"

    const [title , setTitle ] = useState("");
    const [description , setDescription ] = useState("");
    const [category , setCategory ] = useState("");
    const [file,setFile] = useState(null);
    const [location,setlocation] = useState("");
    const [tags,settags] = useState('');
    const [clear,setClear] = useState(false)
    
    const createPost = async (e)=>{
        const token = localStorage.getItem("accessToken") 
        const user = localStorage.getItem("user")
        if(!title || !description || !file || !category ){
          console.log("please provide mandetory fields!")
        }

        const form = new FormData()
        form.append('videoFile',file);
        form.append("title" , title)
        form.append("description" , description)
        form.append("category" , category)
        form.append("location" , location)
        form.append("tags" , tags)
        form.append("token" , token)
        form.append("user",user);


        console.log(form.get("user"));

        try {
          await axios.post(uploadVideoUrl,form
           ) 
          .then((res)=>{
            console.log(res.data);
          }).catch((err)=>{
            console.log(err);
          })
        } catch (error) {
          console.log(error);
        }
    }

    function clearForm(){
        setTitle('');
        setDescription('');
        setFile('');
        setlocation('');
        settags('');
        setClear(true);
        navigate('/createpost')
    }
    useEffect(()=>{
      console.log("upload page loaded")
    },[clear])
  return (
    <form className='w-full gap-5' onSubmit={createPost}>
        <FormControl className='mb-10'>
        <FormLabel name='title'>Title</FormLabel>
        <Textarea className='shad-textarea custum-scrollbar'
         onChange={(e) => setTitle(e.target.value)} />
        </FormControl>

        <FormControl className='mb-10'>
        <FormLabel name='description'>Description</FormLabel>
        <Textarea className='shad-textarea custum-scrollbar'
         onChange={(e) => setDescription(e.target.value)} />
        </FormControl>

        <FormControl className='mb-10'>
          <Input type='file'
          className='shad-textarea custum-scrollbar p-2'
          placeholder='Tap to Choose file from local'
          variant={'filled'}
          onChange={(e) => setFile( e.target.files[0])}
          />
        </FormControl>

        <FormControl className='mb-10'>
        <Select placeholder='Select Category'
          size='md'  bg='black' color='white' 
          onChange={(e) => setCategory(e.target.value)}
         >
          <option className='text-black' bg='black' color='white' value='option1'>Option 1</option>
          <option className='text-black' bg='black' color='white' value='option2'>Option 2</option>
          <option className='text-black' bg='black' color='white' value='option3'>Option 3</option>
        </Select>
        </FormControl>

        <label className='mb-10' >Add location</label>
        <Input name='location' className='mb-5'
         onChange={(e) =>setlocation(e.target.value)}/>

        <label className=''>Add tags (seprated by comma ",") </label>
        <Input name='tags' className='mb-5'
         onChange={(e) =>settags(e.target.value)} />

        <div className='flex gap-4 items-center justify-end'>
            <Button type='button' className='shad-button_dark_4'
                onClick={clearForm}
            >
                Cancle
            </Button>
            <Button  onClick={createPost} className='shad-button_primary whitespace-nowrap'>
                Submit
            </Button>
        </div>
         
    </form>
  )
}

export default PostForm