import React, { useEffect,useState , useRef } from 'react'
import { Card, CardHeader, CardBody, CardFooter,Stack,Heading,Divider,ButtonGroup,Button } from '@chakra-ui/react'
import VideoCard from '../components/VideoCard';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import NoResults from '../components/NoResults';

function Home() {
  const topic = useLocation().search.replace('?topic=',"")
  console.log(topic);
 
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

  const allDbVideosUrl = "https://video-app-backend-s7qn.onrender.com/api/v1/video/getallvideos"
  const testApi = "http://localhost:3333/api"

  const [videosList, setVideosList] = useState([]);
  const [isAtBottom , setIsAtBottom] = useState(false);
  const [isLoading , setLoading] = useState(false);
  const [uniqueIds,setuniqueIds] = useState([]);
  
  

  const onlyUniqueItem = (array)=>{
    const newSet = new Set(uniqueIds);
    for(item of array){
      const x =  newSet.has(item._id)
      if(!x){
        setuniqueIds([...uniqueIds,item._id]);
        setVideosList([...videosList,item])
      } 
    }
  }
  useEffect(()=>{
    setLoading(true);
    try {
      axios.get(allDbVideosUrl)
      .then((res)=>{
        setVideosList(res.data.allVideos)
        setLoading(false)
      })
      .catch((err) => {
        console.log(err);
        setLoading(false)
      })
    } catch (error) {
      console.log(error)
      setLoading(false)
    }
  },[])

  const onBottomClick =async ()=>{
    setLoading(true);
    try {
      axios.get(allDbVideosUrl)
      .then((res)=>{
        console.log(res.data);
        onlyUniqueItem(res.data.items)
        console.log(videosList);
        console.log(uniqueIds);
        setLoading(false)
      })
      .catch((err) => {
        console.log(err);
        setLoading(false)
      })
    } catch (error) {
      console.log(error)
      setLoading(false)
    }
  }


  return (
    <div className='flex flex-1 mt-10 md:mt-0 snap-y snap-mandatory overflow-y-hidden'>
      <div className='home-container bg-transparent snap-y snap-mandatory overflow-y-hidden'> 
      <div  className='flex gap-6 flex-wrap md:justify-start'>
        {videosList.map( (video) => (
          <VideoCard key={video._id} _id={video?._id} videoUrl={video?.videoFile} caption={video?.title} 
            ownerId={video?.owner} ownerImg={img} ownerUsername={video?.ownerUsername} 
          />
        ) )}  
      </div>
      <Button isLoading={isLoading}
       onClick={onBottomClick}>Load</Button>
      </div>
    </div>
  )
}

export default Home