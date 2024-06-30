import React, { useEffect, useRef, useState } from 'react';
import { useNavigate,useLocation } from 'react-router-dom';
import { GoVerified } from 'react-icons/go';
import { Image ,AspectRatio, useStepContext} from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { MdOutlineCancel } from 'react-icons/md';
import { BsFillPlayFill } from 'react-icons/bs';
import { HiVolumeUp, HiVolumeOff } from 'react-icons/hi';

import { Card,CardBody,CardFooter } from '@chakra-ui/react';
import { FcLike,FcLikePlaceholder } from "react-icons/fc";
import { MdInsertComment } from "react-icons/md";
import axios from 'axios';



const Detail = () => {
  const navigate = useNavigate();
  const videoId = useLocation().pathname.split('/')[2];

  const [videoInfo,setVideoInfo] = useState([])
  const [isPlaying,setIsPlaying] = useState(false);
  const [isLiked,setLiked] = useState(false);
  const [likeCnt,setlikecnt] = useState(0)

  const videoRef = useRef(null);

  const checkLike = async () => {
    await axios.post('https://video-app-backend-s7qn.onrender.com/api/v1/video/check-like',{
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
  

  const getVideoInfo = async () => {
    await axios.post("https://video-app-backend-s7qn.onrender.com/api/v1/video/getvideobyid",{videoId:videoId})
    .then(async (res)=>{
      setVideoInfo(res.data.video);
      setlikecnt(res.data.video.likes);
      checkLike();
    })
    .catch((err)=>{
      console.log(err)
    })
  }

  useEffect(()=>{
    getVideoInfo();
  },[videoId])


  const onVideoClick = () => {
    if (isPlaying) {
      videoRef?.current?.pause();
      setIsPlaying(false);
    } else {
      videoRef?.current?.play();
      setIsPlaying(true);
    }
  };

  // useEffect(() => {
  //   if (post && videoRef?.current) {
  //     videoRef.current.muted = isVideoMuted;
  //   }
  // }, [post, isVideoMuted]);


  const likedByUser = ()=>{
    axios.post("https://video-app-backend-s7qn.onrender.com/api/v1/video/likedbyuser",{
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
    axios.post("https://video-app-backend-s7qn.onrender.com/api/v1/video/unlikedbyuser",{
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

  // const addComment = async (e) => {
  //   e.preventDefault();

  //   if (userProfile) {
  //     if (comment) {
  //       setIsPostingComment(true);
  //       const res = await axios.put(`${BASE_URL}/api/post/${videoId}`, {
  //         userId: userProfile._id,
  //         comment,
  //       });

  //       setPost({ ...post, comments: res.data.comments });
  //       setComment('');
  //       setIsPostingComment(false);
  //     }
  //   }
  // };

return(
  <div>
    <div>
    <Card className='mt-1'
      direction={{ base: 'column', sm: 'row' }}
      overflow='hidden'
      variant='outline'
    >
      <CardBody>
        <AspectRatio ratio={9/16} className='w-[350px]'>
          <video
            loop
            src={videoInfo.videoFile}
            ref={videoRef}
            onClick={onVideoClick}
            className='w-[250px]  rounded-xl cursor-pointer bg-off-white'
          ></video>
        </AspectRatio>
      </CardBody>
      <CardFooter className="flex flex-col-reverse mb-5 pb-5 ">  

         {/* <p className='text-center mb-5'>{103}</p> */}
        <MdInsertComment className='text-4xl ' />
        {
          isLiked ? (
            <>
            <p className='text-center mb-5'>{likeCnt|| 0}</p>
            <FcLike onClick={handleLike} className='text-4xl' />
            </>
          ):(
            <>
            <p className='text-center mb-5'>{likeCnt}</p>
            <FcLikePlaceholder onClick={handleLike} className='text-4xl ' />
            </>
          )
        }
        
        
        
      </CardFooter>
      </Card>
    </div>
  </div>
)}

export default Detail;
