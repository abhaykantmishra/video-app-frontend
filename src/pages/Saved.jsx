import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import SmallVideoCard from "../components/SmallVideoCard";
import axios from "axios";

const Saved = () => {


const [videos , setVideos] = useState([]);


const getVideo = async (vidIds) => {
  await  axios.post("/api/v1/video/getvideosbyidarray",{Ids:vidIds})
    .then((res) => {
      setVideos(res.data.videos);
    })
    .catch((err) => {
      console.log(err);
    })
}
  
const getSavedVideos = async () => {
  await axios.post('/api/v1/user/getsavedvideos',{
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
  getSavedVideos();
},[])

const dummyUrl = 'https://images.unsplash.com/photo-1531403009284-440f080d1e12?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80'

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