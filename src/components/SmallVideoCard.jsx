import React, { useState,useEffect,useRef } from 'react'
import { Card, CardHeader, CardBody, CardFooter, Button,Image, AspectRatio } from '@chakra-ui/react'

import { Link } from 'react-router-dom'
import axios from 'axios'

import { FcLike } from "react-icons/fc";
import { FcLikePlaceholder } from "react-icons/fc";
import {IoBookmark , IoBookmarkOutline} from "react-icons/io5";
import { BsFillPlayFill, BsFillPauseFill } from 'react-icons/bs';
import { HiVolumeUp, HiVolumeOff } from 'react-icons/hi';
import { PiCloudSlash } from 'react-icons/pi';


const SmallVideoCard = ({ videoId,videoUrl,isShowingOnHome=false,likes=0,caption,ownerId,ownerUsername,ownerImg}) => {

  // videoUrl = "http://res.cloudinary.com/dcqgytpzz/video/upload/v1719571878/r5xp3heucxqcic8q6mll.mp4" 

    const [isLiked,setLiked] = useState(false);
    const [likeCnt,setlikecnt] = useState(0);
    const [isSaved,setSaved] = useState(true);
    const videoRef = useRef(null);
    const [isPlaying,setPlaying] = useState(false);
    const [isVideoMuted,setIsVideoMuted] = useState(false);

    const checkLike = async () => {
        await axios.post('/api/v1/video/check-like',{
          userId:localStorage.getItem("userId"),
          videoId:videoId
        }).then((res)=>{
          if(res.data.liked === true)
             setLiked(true)
          else setLiked(false)
        })
        .catch((err) => {
          console.log(err);
          return;
        })
    }

    const likedByUser = ()=>{
        axios.post("/api/v1/video/likedbyuser",{
          userId:localStorage.getItem("userId"), videoId:videoId 
        })
        .then((res)=>{
          return;
        })
        .catch((err)=>{
          console.log(err)
          return;
        })
    }
    
    const unlikedByUser = ()=>{
      axios.post("/api/v1/video/unlikedbyuser",{
        userId:localStorage.getItem("userId"), videoId:videoId 
      })
      .then((res)=>{
        return;
      })
      .catch((err)=>{
        console.log(err)
        return;
      })
    }

    const handleLike = async () => {
        if(isLiked === true){
         setlikecnt(likeCnt-1)
         setLiked(false)
         unlikedByUser();
        }else{
         setlikecnt(likeCnt+1)
         setLiked(true)
         likedByUser();
        }
    };

    const checkSaved = async () => {
        await axios.post('/api/v1/user/check-saved',{
          userId:localStorage.getItem("userId"),
          videoId:videoId
        }).then((res)=>{
          if(res.data.saved === true)
             setSaved(true)
          else setSaved(false)
        })
        .catch((err) => {
          console.log(err);
          return;
        })
    }

    const savedByUser = () => {
        axios.post("/api/v1/user/savedbyuser",{
          userId:localStorage.getItem("userId"), videoId:videoId 
        })
        .then((res)=>{
          return;
        })
        .catch((err)=>{
          console.log(err)
          return;
        })
      }

    const unSavedByUser = () => {
        axios.post("/api/v1/user/unsavedbyuser",{
          userId:localStorage.getItem("userId"), videoId:videoId 
        })
        .then((res)=>{
          return;
        })
        .catch((err)=>{
          console.log(err)
          return;
        })
      }

    const handleSaved = async () => {
        if(isSaved == true){
          setSaved(false);
          unSavedByUser();
        }else{
          setSaved(true);
          savedByUser();
        }
    }

    const onPlayPress = () =>{
      if (isPlaying) {
        videoRef?.current?.pause();
        setPlaying(false);
      } else {
        videoRef?.current?.play();
        setPlaying(true);
      }
    }

    useEffect(() => {
      checkLike();
      checkSaved();
    }, [isSaved])
    
  if(isShowingOnHome === true){
    return (
      <>
       <div>
        
       </div>
      </>
    )
  }

  return (
    <>
    <div className='w-[180px] md:w-[230px] mx-2'>
        <Link to={`/profile/${ownerId}`} >
        <div className="flex flex-row pt-1">
            <Image className='rounded-full h-[30px] w-[30px] md:w-[40px] md:h-[40px] '
              src={ownerImg || 'https://images.unsplash.com/photo-1531403009284-440f080d1e12?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80'}
              alt='img'
            />
            <p className='ml-2 font-medium md:text-lg text-md text-sky-300'>@{ownerUsername || "username"}</p>
        </div>
        </Link>
        <Card className='w-full'>
          <Link to={`/detail/${videoId}`} >
            <AspectRatio ratio={9/16} className='w-full'>
                <video 
                loop
                ref={videoRef}
                src={videoUrl}>
                </video>
            </AspectRatio>
          </Link>
          <div className=' h-[30px] md:h-[45px] bg-yellow-600 flex flex-row justify-between rounded-b-lg'>
              {
                  isLiked ? (
                      <FcLike onClick={handleLike} className='md:mt-2 ml-1 text-rose-300 text-2xl'/>
                  ):(
                      <FcLikePlaceholder onClick={handleLike} className='md:mt-2 ml-1 text-2xl'/>
                  )
              }
              {
                isPlaying ? (
                  <button onClick={onPlayPress}>
                    <BsFillPauseFill className='text-white text-3xl text-center md:mb-2' />
                  </button>
                ):(
                  <button onClick={onPlayPress}>
                    <BsFillPlayFill className='text-white text-3xl text-center md:mb-2' />
                  </button>
                )
              }
              {
                isVideoMuted ? (
                  <button onClick={() => setIsVideoMuted(false)}>
                    <HiVolumeOff className='text-white text-2xl text-center md:mb-2' />
                  </button>
                ) : (
                  <button onClick={() => setIsVideoMuted(true)}>
                    <HiVolumeUp className='text-white text-2xl text-center md:mb-2' />
                  </button>
                )
              }
              {
                   isSaved ? (
                     <IoBookmark onClick={handleSaved} className=' text-2xl text-white text-center md:mt-2 mr-1' />
                   ):(
                     <IoBookmarkOutline onClick={handleSaved} className=' text-2xl text-center md:mt-2 mr-1'/>
                   )
              }
          </div>
        </Card>
        <Link to={`/detail/${videoId}`} className='overflow-x-hidden overflow-y-hidden w-full h-7 bg-transparent'>
            <p className='text-blue-500 text-pretty text-lg'> {caption || "no title provided"} </p>
        </Link>
    </div>
    </>
  )
}

export default SmallVideoCard