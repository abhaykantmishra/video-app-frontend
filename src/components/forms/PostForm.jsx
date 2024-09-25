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

    const uploadVideoUrl = `${import.meta.env.VITE_BASE_URL}/api/v1/video/uploadvideo`

    const [isLoading,setLoading] = useState(false)
    const [formMsg,setFormMsg] = useState('');
    const [title , setTitle ] = useState("");
    const [description , setDescription ] = useState("");
    const [category , setCategory ] = useState("");
    const [file,setFile] = useState(null);
    const [location,setlocation] = useState("");
    const [tags,settags] = useState('');
    const [clear,setClear] = useState(false)
    
    const createPost = async (e)=>{
        setLoading(true)
        const token = localStorage.getItem("accessToken") 
        const user = localStorage.getItem("user")
        if(!title || !description || !file || !category || !location || !tags){
          e.preventDefault();
          console.log("please provide all fields!")
          setFormMsg("please provide all fields!")
          setLoading(false)
          return 
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
            if(res.data){
              setLoading(false)
              setFormMsg("video uploade sucessfully");
              navigate(`/profile/${localStorage.getItem('userId')}`);
            }
          }).catch((err)=>{
            setLoading(false)
            navigate(`/profile/${localStorage.getItem('userId')}`);
            console.log(err);
            return;
          })
        } catch (error) {
          setLoading(false)
          navigate(`/profile/${localStorage.getItem('userId')}`);
          console.log(error);
          return;
        }
    }

    function clearForm(){
        navigate(`/profile/${localStorage.getItem("userId")}`)
    }
    useEffect(()=>{
      console.log("upload page loaded")
    },[clear])
  return (
    <form className='w-full gap-5' onSubmit={createPost}>
        <FormControl className='mb-10'>
        <FormLabel name='title'>Title</FormLabel>
        <Textarea className='shad-textarea custum-scrollbar'
         onChange={(e) => {          
          setLoading(false)
          setFormMsg('')
          setTitle(e.target.value)}} />
        </FormControl>

        <FormControl className='mb-10'>
        <FormLabel name='description'>Description</FormLabel>
        <Textarea className='shad-textarea custum-scrollbar'
         onChange={(e) =>{
          setLoading(false)
          setFormMsg('')
          setDescription(e.target.value)}} />
        </FormControl>

        <FormControl className='mb-10'>
          <Input type='file'
          className='shad-textarea custum-scrollbar p-2'
          placeholder='Tap to Choose file from local'
          variant={'filled'}
          onChange={(e) => {
            setLoading(false)
            setFormMsg('')
            setFile( e.target.files[0])}}
          />
        </FormControl>

        <FormControl className='mb-10'>
        <Select placeholder='Select Category'
          size='md'  bg='black' color='white' 
          onChange={(e) => {
            setLoading(false)
            setFormMsg('')
            setCategory(e.target.value)}}
         >
          <option className='text-black' bg='black' color='white' value='development'>development</option>
          <option className='text-black' bg='black' color='white' value='comedy'>comedy</option>
          <option className='text-black' bg='black' color='white' value='gaming'>gaming</option>
          <option className='text-black' bg='black' color='white' value='food'>food</option>
          <option className='text-black' bg='black' color='white' value='beauty'>beauty</option>
          <option className='text-black' bg='black' color='white' value='music'>music</option>

        </Select>
        </FormControl>

        <label className='mb-10' >Add location</label>
        <Input name='location' className='mb-5'
         onChange={(e) =>{
           setLoading(false)
           setFormMsg('')
           setlocation(e.target.value)}}
          />

        <label className=''>Add tags (seprated by comma ",") </label>
        <Input name='tags' className='mb-5'
         onChange={(e) =>{
          setLoading(false)
          setFormMsg('')
          settags(e.target.value)}}
           />

        <div className='flex gap-4 items-center justify-end'>
            <Button type='button' className='shad-button_dark_4'
                onClick={clearForm}
            >
                Cancle
            </Button>
            <Button 
              isLoading={isLoading}
             onClick={createPost} className='shad-button_primary whitespace-nowrap'>
                Submit
            </Button>
            <p className='text-red'>{formMsg}</p>
        </div>
         
    </form>
  )
}

export default PostForm
