import React, { useEffect, useRef, useState, useContext } from 'react';
import { useNavigate,useLocation } from 'react-router-dom';
import { GoVerified } from 'react-icons/go';
import {Card, Image ,AspectRatio, Input, InputGroup, InputRightElement, Button} from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import axios from 'axios';

import { FcLike } from "react-icons/fc";
import { FcLikePlaceholder } from "react-icons/fc";
import {IoBookmark , IoBookmarkOutline} from "react-icons/io5";
import { BsFillPlayFill, BsFillPauseFill } from 'react-icons/bs';
import { HiVolumeUp, HiVolumeOff } from 'react-icons/hi';
import { MdOutlineMessage } from "react-icons/md";
import { LuSendHorizonal } from "react-icons/lu";
import Comments from '../components/Comments';




const Detail = () => {

  const videoId = useLocation().pathname.split('/')[2];

  const [videoInfo,setVideoInfo] = useState([])
  const [isLiked,setLiked] = useState(false);
  const [likeCnt,setlikecnt] = useState(0);
  const [isSaved,setSaved] = useState(false);
  const videoRef = useRef(null);
  const [isPlaying,setPlaying] = useState(false);
  const [isVideoMuted,setIsVideoMuted] = useState(false);
  const [isShowingComments,setShowingComments] = useState(false);
  const [allComments,setComments] = useState([]);
  const [commentInput,setCommentInput] = useState("");
  const [user,setuser] = useState({});
  const [isCurrentuser,setisCurrentuser] = useState(false);

  const getUser = () => {
    const usr = JSON.parse(localStorage.getItem('user'));
    console.log(typeof usr);
    console.log(usr);
    setuser(usr);
  }

  const getVideoInfo = async () => {
    // e.preventDefault();
    await axios.post(`${import.meta.env.VITE_BASE_URL}/api/v1/video/getvideobyid`,{videoId:videoId})
    .then(async (res)=>{
      setVideoInfo(res.data.video);
      // console.log(res.data.video)
      setlikecnt(res.data.video.likes);
    })
    .catch((err)=>{
      console.log(err)
    })
}

  const checkLike = async () => {
      // e.preventDefault();
      // console.log(import.meta.env.VITE_BASE_URL)
      await axios.post(`${import.meta.env.VITE_BASE_URL}/api/v1/video/check-like`,{
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
      axios.post(`${import.meta.env.VITE_BASE_URL}/api/v1/video/likedbyuser`,{
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
    axios.post(`${import.meta.env.VITE_BASE_URL}/api/v1/video/unlikedbyuser`,{
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
      // e.preventDefault();
      await axios.post(`${import.meta.env.VITE_BASE_URL}/api/v1/user/check-saved`,{
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
      axios.post(`${import.meta.env.VITE_BASE_URL}/api/v1/user/savedbyuser`,{
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
      axios.post(`${import.meta.env.VITE_BASE_URL}/api/v1/user/unsavedbyuser`,{
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
    if(isShowingComments === false){
      setShowingComments(true);
    }else{
      setShowingComments(false);
    }
  }


  useEffect(()=>{
    checkLike()
    checkSaved()
    getVideoInfo();
    getUser();
  },[videoId])

return(
  <>
  <div className='w-[330px] md:w-[360px] md:ml-5'>
    <div className='w-full flex items-center justify-center'>
    <div className='w-full flex flex-row mt-4'>
      <Card bg={'black'} onClick={onPlayPress} className='w-full'>
        <AspectRatio ratio={9/16} className='w-full'>
            <video 
            loop
            ref={videoRef}
            src={videoInfo.videoFile}>
            </video>
        </AspectRatio>
        <div>
        <Link to={`/profile/${videoInfo.owner}`} >
          <div className="flex flex-row pt-1">
              <Image className='rounded-full h-[30px] w-[30px]'
                src={videoInfo.ownerImg }
                alt='img'
              />
              <p className='ml-2 font-medium md:text-lg text-md text-sky-300'>@{videoInfo.ownerUsername || "username"}</p>
          </div>
        </Link>
        <p className='text-lg text-white'>{videoInfo.title}</p>
        </div>
      </Card>
      
      <div className='w-[40px] bg-transparent my-4 flex flex-col-reverse' > 
        {
          <MdOutlineMessage onClick={handleComments} className='mt-5 ml-1 text-4xl mb-10' />
        }
        {
          isSaved ? (
            <IoBookmark onClick={handleSaved} className='items-center text-4xl text-white text-center mt-5 mr-1' />
          ):(
            <IoBookmarkOutline onClick={handleSaved} className='items-center text-4xl text-center mt-5 mr-1'/>
          )
        }
        <p className='text-center'>
         {likeCnt}
        </p>
        {
          isLiked ? (
              <FcLike onClick={handleLike} className='mt-2 ml-1 text-rose-300 text-4xl'/>
          ):(
              <FcLikePlaceholder onClick={handleLike} className='mt-2 ml-1 text-4xl'/>
          )
        }
        
      </div>
    </div>
    </div>
  </div>
  {
      isShowingComments ? (
        <>
        <div className='border-white border-[1px] h-[500px] mt-10 lg:w-[400px] md:w-[280px] w-[200px]'>
        <Comments videoId={videoId}/>
        </div>
        </>
      ):(
        <>
        </>
      )
    }
  </>
)}

export default Detail;
