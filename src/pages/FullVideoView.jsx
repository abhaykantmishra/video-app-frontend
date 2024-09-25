import React, {useState,useEffect} from 'react'
import SmallVideoCard from '../components/SmallVideoCard'
import { useLocation } from 'react-router-dom';
import axios from 'axios';

const FullVideoView = () => {
    const videoId = useLocation().pathname.split('/')[2];

    const [videoInfo,setVideoInfo] = useState([])

    const getVideoInfo = async () => {
        await axios.post(`${import.meta.env.VITE_BASE_URL}/api/v1/video/getvideobyid`,{videoId:videoId})
        .then(async (res)=>{
          setVideoInfo(res.data.video);
          console.log(res.data.video)
        })
        .catch((err)=>{
          console.log(err)
        })
    }

    useEffect(()=>{
      getVideoInfo();
    },[videoId])
  return (
    <>
        <SmallVideoCard 
            videoId={videoId} 
            videoUrl={videoInfo.videoFile}
            isShowingOnHome={true}
            likes={(videoInfo.likes+1)}
            caption={videoInfo.title}
            ownerId={videoInfo.owner}
            ownerUsername={videoInfo.ownerUsername}
            ownerImg={videoInfo.ownerImg}
         />
    </>
  )
}

export default FullVideoView