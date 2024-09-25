import React, { useEffect,useState , useRef } from 'react'
import { Card, CardHeader, CardBody, CardFooter,Stack,Heading,Divider,ButtonGroup,Button } from '@chakra-ui/react'
import VideoCard from '../components/VideoCard';
import SmallVideoCard from '../components/SmallVideoCard';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import NoResults from '../components/NoResults';

function Home( {videos} ) {
  const topic = useLocation().search.replace('?topic=',"")
  
  const navigate = useNavigate();
  const isPostLoading = true;
  const posts = null;
  const postedBy = {
    userName:'akm'
  }
  const img = "http://res.cloudinary.com/dcqgytpzz/image/upload/v1719572744/posmb21ih5ajzyxxrw3h.jpg";
  const video = {
    videoFile:"http://res.cloudinary.com/dcqgytpzz/video/upload/v1719571878/r5xp3heucxqcic8q6mll.mp4"
  }

  const allDbVideosUrl = "/api/v1/video/getallvideos"
  const testApi = "http://localhost:3333/api"

  const [videosList, setVideosList] = useState([]);
  const [isAtBottom , setIsAtBottom] = useState(false);
  const [isLoading , setLoading] = useState(false);
  const [uniqueIds,setuniqueIds] = useState([]);
  const [topicVideo,setTopicVideo]=useState([]);
  // const [videos , setAllVideos] = useState([]);
  const [isShowingTopic,setisShowingTopic] = useState(false)

  const onlyUniqueItem = (array)=>{
    const newSet = new Set(uniqueIds);
    for(item of array){
      const x =  newSet.has(item._id)
      if(!x){
        setuniqueIds([...uniqueIds,item._id]);
      } 
    }
  }

  function getTopicVideos(){
    setTopicVideo([]);
    const topicVid = videos.filter((video) => {
      if(video.category === topic)
          return video;
    })
    setTopicVideo(topicVid);
  }

  useEffect(()=>{
    if(topic.trim()){
      setisShowingTopic(true);
      getTopicVideos()
    }else{
      setisShowingTopic(false)
    }
  },[topic])


  return (
    <div className='flex flex-1 mt-10 md:mt-0 snap-y snap-mandatory overflow-y-hidden'>
      <div className='home-container bg-transparent snap-y snap-mandatory overflow-y-hidden'> 
      <div  className='flex gap-6 flex-wrap md:justify-start text-white'>
        {
          !isShowingTopic ? (
            <>
            {videos?.map( (video) => (
              <SmallVideoCard key={video._id} videoId={video?._id} videoUrl={video?.videoFile} caption={video?.title} 
                ownerId={video?.owner} ownerImg={video?.ownerImg} ownerUsername={video?.ownerUsername} 
              />
            ))}
            </>
          ):(
            <>
            {topicVideo?.map( (video) => (
              <SmallVideoCard key={video._id} videoId={video?._id} videoUrl={video?.videoFile} caption={video?.title} 
                ownerId={video?.owner} ownerImg={video?.ownerImg} ownerUsername={video?.ownerUsername} 
              />
            ))}
            </>            
          )
        }
      </div>
     </div>    
   </div>
  )
}

export default Home
