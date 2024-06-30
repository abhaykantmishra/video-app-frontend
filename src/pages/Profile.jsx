import React, { useEffect, useState } from 'react';
import { Image , Button,ButtonGroup } from '@chakra-ui/react';
import { GoVerified } from 'react-icons/go';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import { MdEdit } from "react-icons/md";
import VideoCard from '../components/VideoCard';
import NoResults from '../components/NoResults';
import { useNavigate } from 'react-router-dom';
// import { IUser, Video } from '../../types';
// import { BASE_URL } from '../../utils';



const Profile = ( ) => {

  const userId = useLocation().pathname.split('/')[2];
  const navigate = useNavigate();
  const verifyUrl = '/api/v1/user/verifyuser'
  const getUserUrl = '/api/v1/user/getanyuser'
  const getVideosUrl = '/api/v1/user/userchannel'
  const [showUserVideos, setShowUserVideos] = useState(true);
  const [videosList, setVideosList] = useState([]);
  const [user , setUser] = useState({});
  const [isCurrentUser,setIsCurrentUSer] = useState(false)

  async function checkIfCurrentUser(){
    if(userId === localStorage.getItem("userId")){
      await axios.post(verifyUrl,{
        token:localStorage.getItem("accessToken") ,
        userId:localStorage.getItem("userId")
      }).then((res)=>{
        if(res.data.msg === "your access token verified"){
          setIsCurrentUSer(true);
        }else{
          setIsCurrentUSer(false)
        }
      }).catch((err)=>{
        setIsCurrentUSer(false);
        console.log(err);
      })
    }
  }

  function editProfileHandler(){
    navigate(`/editprofile/${localStorage.getItem("userId")}`);
  }
 
  useEffect( () => {
    checkIfCurrentUser();
    try {
      axios.post(getUserUrl , {userId:userId})
      .then((res)=>{
        setUser(res.data.user)
      })
      .catch((err)=>{
        console.log(err);
        return null;
      })
    } catch (error) {
      console.log(error);
      return null;
    }
  },[userId])
  useEffect( ()=>{
    try {
      axios.post(getVideosUrl , {username:user.username})
      .then((res)=>{
        setVideosList(res.data.userVideos);
      })
      .catch((err) => {
        console.log(err)
      })
     } catch (error) {
       console.log(error); 
     }
  },[user,userId])

  const videos = showUserVideos ? 'border-b-2 border-black text-blue-500' : 'text-gray-400';
  const liked = !showUserVideos ? 'border-b-2 border-black text-blue-500' : 'text-gray-400';


  return (
    
    <div className='w-full bg-black text-white color-white'>
      <div className='flex gap-6 md:gap-10 mb-4 bg-black w-full'>
        <div className='w-16 h-16 md:w-32 md:h-32'>
          <Image
            width={120}
            height={120}
            layout='responsive'
            className='rounded-full'
            src={user?.profileImg}
            alt='user-profile'
          />
        </div>

        <div>
          <div className='text-md md:text-2xl font-bold tracking-wider flex gap-2 items-center justify-center lowercase'>
            <span>@{user?.username?.replace(/\s+/g, '')} </span>
            <GoVerified className='text-blue-400 md:text-xl text-md' />
          </div>
          <p className='text-sm font-medium'>{user?.name}</p>
        </div>
        {
          isCurrentUser ? (
            <div className='mt-2 flex justify-end rounded-2xl'>
              <Button color='blue'
              onClick={editProfileHandler}
              variant='ghost'
              >
               <MdEdit />
               Edit Profile
              </Button>
            </div>
          ):(
            <div>
              
            </div>
          )
        }
      </div>
      <div>
        <div className='flex gap-10 mb-10 mt-10 border-b-2 border-gray-200 bg-black w-full'>
          <p className={`text-xl font-semibold cursor-pointer ${videos} mt-2`} onClick={() => setShowUserVideos(true)}>
            Videos
          </p>
          <p className={`text-xl font-semibold cursor-pointer ${liked} mt-2`} onClick={() => setShowUserVideos(false)}>
            Liked
          </p>
        </div>
        <div className='flex gap-6 flex-wrap md:justify-start'>
          {videosList?.length > 0 ? (
            videosList.map((video) => (
              <VideoCard key={video._id} isShowingOnHome={false} _id={video._id} 
                caption={video.title} likes={video.likes} ownerId={video.owner}
                 ownerUsername={video.ownerUsername} ownerImg={user.profileImg}
                 videoUrl={`${video.videoFile}`}
              />
            ))
          ) : (
            <NoResults
              text={`No ${showUserVideos ? '' : 'Liked'} Videos Yet`}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;