import React, { useState,useEffect,useRef } from 'react'
import { Card, CardHeader, CardBody, CardFooter, Button,Image, AspectRatio } from '@chakra-ui/react'

import { Link } from 'react-router-dom'
import axios from 'axios'

import { FcLike } from "react-icons/fc";
import { FcLikePlaceholder } from "react-icons/fc";
import {IoBookmark , IoBookmarkOutline} from "react-icons/io5";
import { BsFillPlayFill, BsFillPauseFill } from 'react-icons/bs';
import { HiVolumeUp, HiVolumeOff } from 'react-icons/hi';
import { MdOutlineMessage } from "react-icons/md";

const SmallVideoCard = ({ videoId,videoUrl,isShowingOnHome=false,likes,caption,ownerId,ownerUsername,ownerImg}) => {


    const [isLiked,setLiked] = useState(false);
    const [likeCnt,setlikecnt] = useState(0);
    const [isSaved,setSaved] = useState(false);
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
        setlikecnt(likeCnt+1);
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
      setlikecnt(likeCnt-1)
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
        console.log(likes, " ", likeCnt);
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

    const handleComments = () => {

    }

    useEffect(() => {
     setlikecnt(Number(likes)-1);
      checkLike();
      checkSaved();
    }, [])
    
  if(isShowingOnHome === true){
    return (
      <>
      <div className='w-[330px] md:w-[360px] md:ml-5'>
        <div className='w-full flex  items-center justify-center'>
        <div className='w-full flex flex-row mt-4'>
          <Card bg={'black'} onClick={onPlayPress} className='w-full'>
            <AspectRatio ratio={9/16} className='w-full'>
                <video 
                loop
                ref={videoRef}
                src={videoUrl}>
                </video>
            </AspectRatio>
            <div>
            <Link to={`/profile/${ownerId}`} >
              <div className="flex flex-row pt-1">
                  <Image className='rounded-full h-[30px] w-[30px]'
                    src={ownerImg }
                    alt='img'
                  />
                  <p className='ml-2 font-medium md:text-lg text-md text-sky-300'>@{ownerUsername || "username"}</p>
              </div>
            </Link>
            <p className='text-lg text-white'>{caption}</p>
            </div>
          </Card>
          
          <div className='w-[40px] bg-transparent my-4 flex flex-col-reverse' > 
            {
              <MdOutlineMessage onClick={handleComments} className='md:mt-5 ml-1 text-4xl' />
            }
            {
              isSaved ? (
                <IoBookmark onClick={handleSaved} className='items-center text-4xl text-white text-center md:mt-5 mr-1' />
              ):(
                <IoBookmarkOutline onClick={handleSaved} className='items-center text-4xl text-center md:mt-5 mr-1'/>
              )
            }
            <p className='text-center'>
             {likeCnt}
            </p>
            {
              isLiked ? (
                  <FcLike onClick={handleLike} className='md:mt-2 ml-1 text-rose-300 text-4xl'/>
              ):(
                  <FcLikePlaceholder onClick={handleLike} className='md:mt-2 ml-1 text-4xl'/>
              )
            }
            
          </div>
        </div>
        </div>
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
              src={ownerImg }
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