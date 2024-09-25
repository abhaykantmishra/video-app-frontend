import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import SmallVideoCard from "../components/SmallVideoCard";
import axios from "axios";
import { Button } from "@chakra-ui/react";
import NoResults from "../components/NoResults";

const Saved = () => {


const [videos , setVideos] = useState([]);
const [pageLoading,setPageLoading] = useState(false);

const getVideo = async (vidIds) => {
  await  axios.post(`${import.meta.env.VITE_BASE_URL}/api/v1/video/getvideosbyidarray`,{Ids:vidIds})
    .then((res) => {
      setVideos(res.data.videos);
      setPageLoading(false);
    })
    .catch((err) => {
      console.log(err);
    })
}
  
const getSavedVideos = async () => {
  setPageLoading(true);
  await axios.post(`${import.meta.env.VITE_BASE_URL}/api/v1/user/getsavedvideos`,{
    userId:localStorage.getItem('userId'),
    token:localStorage.getItem('accessToken')
  })
  .then((res) => {
    getVideo(res.data.savedVideos);
  })
  .catch((err) => {
    console.log(err);
  })
}

useEffect(()=>{
  setPageLoading(true);
  getSavedVideos();
},[])

if(videos.length === 0 && pageLoading === false) {
  return (
      <>
     <NoResults text={'No Saved Videos Yet'} />
      </>
    )
}

if(pageLoading === true){
  return (
    <>
    <div className='flex flex-col ml-[40%]'>
       <Button
          size="lg"
          isLoading={pageLoading}
          loadingText='Loading'
          colorScheme='white'
          variant='filled outline'
          spinnerPlacement='start'
          className='justify-center items-center text-2xl'
      >
      </Button>
    </div>
    </>
  )
}

  return (
    <>
    <div  className="flex flex-wrap m-2 px-2">
      {
        videos.map((video) => {
          return (
            <div key={video._id} >
            <SmallVideoCard 
                key={video._id}
                videoUrl={video.videoFile} 
                videoId={video._id} 
                ownerId={video.owner} 
                ownerImg={video.ownerImg}
                ownerUsername={video.ownerUsername}
                caption={video.title}
                likes={video.likes}
            />
            </div>
          )
        })
      }
    </div>
    </>
  )
}

export default Saved
