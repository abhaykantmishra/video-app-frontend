import { Routes , Route, useLocation } from "react-router-dom"
import AuthLayout from "./layouts/AuthLayout"
import RootLayout from "./layouts/RootLayout"
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import Saved from "./pages/Saved";
import CreatePost from "./pages/CreatePost";
import Detail from "./pages/Detail";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import Search from "./components/Search";
import EditProfile from "./pages/EditProfile";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import GuestIds from "./pages/GuestIds";

function App() {
  const [videos,setAllVideos] = useState() 
  async function getAllVideos(){
    await axios.get("https://video-app-backend-s7qn.onrender.com/api/v1/video/getallvideos")
    .then((res)=>{ 
       setAllVideos([...res.data.allVideos])
    })
    .catch((err)=>{
        console.log(err);
    })
  }
  useEffect(() => {
    getAllVideos();
  }, [])
  
  const location = useLocation();
  return (
    <main className='flex h-screen '>
      <Routes>
        <Route path='/guestids' element={<GuestIds />} />

        {/* public Routes => can be seen by everyone */}
        <Route element={<AuthLayout />} >
          <Route path='/login' element={<LoginPage />} />
          <Route path='/signup' element={<SignupPage />} />
        </Route>

        {/* private Routes => can be used/seen only if logged in  */}
        <Route element={<RootLayout />}>
          <Route path='/' element={<Home videos={videos}/>} />
          <Route path='/search/:searchTerm' element={<Search/>} />
          <Route path='/profile/:id/*' element={<Profile />} />
          <Route path='/editprofile/:id' element={<EditProfile />} />
          <Route path='/detail/:id' element={<Detail videoId={location.pathname.split('/')[2]}
          videoUrl={"http://res.cloudinary.com/dcqgytpzz/video/upload/v1719120221/dhtxjexbyws1rka1vciq.mp4"}
          postedBy={'akm'}
          postedId={'akm123'}
          caption={'video'}
          likes={2000}
          VideoComments={['comment1','comment5','comment4','comment3','comment2']}
          />} />
          {/* <Route path='/explore' element={<Explore/>} /> */}
          {/* <Route path='/allusers' element={<AllUsers />} /> */}
          <Route path='/saved' element={<Saved />} />
          <Route path='/createpost' element={<CreatePost />} />
          {/* <Route path='/editpost/:id' element={<EditPost />} /> */}
          {/* <Route path='/posts/:id' element={<PostDetails />} /> */}
          
        </Route>
      </Routes>
    </main>
  )
}

export default App
