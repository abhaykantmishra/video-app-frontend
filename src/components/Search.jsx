import React, { useState,useEffect } from 'react';
import { Image } from '@chakra-ui/react';
import { GoVerified } from 'react-icons/go';
import { Link,useNavigate,useLocation } from 'react-router-dom';
import axios from 'axios';

import NoResults from './NoResults';
import VideoCard from './VideoCard';


const Search = () => {

  const searchTerm = useLocation().pathname.split('/')[2];
  const allUserUrl = `${import.meta.env.VITE_BASE_URL}/api/v1/user/allusers`
  const allVideosUrl = `${import.meta.env.VITE_BASE_URL}/api/v1/video/getallvideos`;

  const [isAccounts, setIsAccounts] = useState(true);
  const [allUsers , setAllusers] = useState([]);
  const [videos , setAllVideos] = useState([]);

  async function getAllUsers(){
     await axios.get(allUserUrl)
     .then((res) => {
        setAllusers([...res.data.allUsers])
     })
     .catch((err)=>{
        console.log(err);
     })
   }

  async function getAllVideos(){
    await axios.post(allVideosUrl,{query:searchTerm})
    .then((res)=>{ 
       setAllVideos([...res.data.videos])
    })
    .catch((err)=>{
        console.log(err);
    })
  }

  useEffect(() => {
   getAllUsers();
   getAllVideos();
  }, [searchTerm]);
  
  
  
  const accounts = isAccounts ? 'border-b-2 border-black text-blue-500' : 'text-white ';
  const isVideos = !isAccounts ? 'border-b-2 border-black text-blue-500' : 'text-white';
  function isValidUser(user){
    if(user.username.toLowerCase().includes(searchTerm) || 
       user.name.toLowerCase().includes(searchTerm) ){
        return user;
    }
  }
  const searchedAccounts = allUsers.filter(isValidUser);
  
  return (
    <div className='w-full  '>
      <div className='flex gap-10 mb-10 border-b-2 border-gray-200  z-50 bg-black w-full'>
        <p onClick={() => setIsAccounts(true)} className={`text-xl  font-semibold cursor-pointer ${accounts} mt-2`}>
          Accounts
        </p>
        <p className={`text-xl font-semibold cursor-pointer ${isVideos} mt-2`} onClick={() => setIsAccounts(false)}>
          Videos
        </p>
      </div>
      {isAccounts ? (
        <div className='md:mt-16'>
          {searchedAccounts.length > 0 ? (
            searchedAccounts.map((user) => (
              <Link key={user._id} to={`/profile/${user._id}`}>
                <div className=' flex gap-3 p-2 cursor-pointer text-blue-500 font-semibold rounded border-b-2 border-gray-200'>
                  <div>
                    <Image width={50} height={50} className='rounded-full' alt='user-profile' src={user.profileImg}/>
                  </div>
                  <div>
                    <div>
                      <p className='flex gap-1 items-center text-lg font-bold text-primary'>
                        {user.username} <GoVerified className='text-blue-400 w-[15px]' />
                      </p>
                      <p className='capitalize text-blue-500 text-sm'>
                        {user.name}
                      </p>
                    </div>
                  </div>
                </div>
              </Link>
            ))
          ) : (
            <NoResults text={`No Account Results for ${searchTerm}`} />
          )}
        </div>
      ) : (
        <div className='md:mt-16 flex flex-wrap gap-6 md:justify-start '>
          {videos.length ? (
            videos.map((video) => (
              <VideoCard key={video._id} _id={video._id} videoUrl={video?.videoFile}
               caption={video.title} likes={video.likes} ownerId={video.owner}
               ownerUsername={video.ownerUsername} ownerImg={video.ownerImg}
              />
            ))
          ) : (
            <NoResults text={`No Video Results for ${searchTerm}`} />
          )}
        </div>
      )}
    </div>
  );
};


export default Search;
