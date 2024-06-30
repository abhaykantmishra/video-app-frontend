import { useState,useRef,useEffect } from 'react';
import { Image,AspectRatio } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { HiVolumeUp, HiVolumeOff } from 'react-icons/hi';
import { BsFillPlayFill, BsFillPauseFill } from 'react-icons/bs';
import { GoVerified } from 'react-icons/go';
import { BsPlay } from 'react-icons/bs';
import { FaHeart } from "react-icons/fa";
import { MdComment } from "react-icons/md";


const VideoCard = ({ _id,videoUrl,isShowingOnHome=false,likes=0,caption,ownerId,ownerUsername,ownerImg}) => {
  const [playing, setPlaying] = useState(false);
  const [isHover, setIsHover] = useState(false);
  const [isVideoMuted, setIsVideoMuted] = useState(false);
  const [isLiked,setLiked] = useState(false);
  const [isCommentOpen, setCommentOpen] = useState(false)
  const videoRef = useRef(null);

  const onVideoPress = () => {
    if (playing) {
      videoRef?.current?.pause();
      setPlaying(false);
    } else {
      videoRef?.current?.play();
      setPlaying(true);
    }
  };
  const onLikePress = () => {
    // increase like
    if(isLiked){
      setLiked(false);
    }else{
      setLiked(true)
    }
    console.log("you pressed like button")
  }
  const onCommentPress = () => {
    // increase like
    if(isCommentOpen){
      setCommentOpen(false);
    }else{
      setCommentOpen(true)
    }
    console.log("you pressed comment button")
  }

  useEffect(() => {
    if (videoRef?.current) {
      videoRef.current.muted = isVideoMuted;
    }
  }, [isVideoMuted]);

  if(!isShowingOnHome) {
    return (
      <div >
        <div className='mb-1 flex flex-row'>
        <Link to={`/profile/${ownerId}`} className='flex flex-row px-2'>
        <img src={ownerImg} alt="img" className='rounded-full w-[30px] mr-2 ' />
        <p className='font-bold text-medium text-sky-300 '>@{ownerUsername}</p>
        </Link>
        </div>
        <div
          onMouseEnter={() => setIsHover(true)}
          onMouseLeave={() => setIsHover(false)}
        > 
          <AspectRatio ratio={9/16} className='w-[200px]'>
            <video
              loop
              src={videoUrl}
              ref={videoRef}
              className='w-[250px]  rounded-xl cursor-pointer bg-off-white'
            ></video>
          </AspectRatio>
          {isHover && (
            <div className='relative bottom-8 px-6 gap-10 cursor-pointer left-8 md:left-14 lg:left-0 flex w-[100px] md:w-[50px]'>
              {playing ? (
                <button onClick={onVideoPress}>
                  <BsFillPauseFill className='text-white text-2xl ' />
                </button>
              ) : (
                <button onClick={onVideoPress}>
                  <BsFillPlayFill className='text-white text-2xl ' />
                </button>
              )}
              {isVideoMuted ? (
                <button onClick={() => setIsVideoMuted(false)}>
                  <HiVolumeOff className='text-white text-2xl ' />
                </button>
              ) : (
                <button onClick={() => setIsVideoMuted(true)}>
                  <HiVolumeUp className='text-white text-2xl ' />
                </button>
              )}
            </div>
          )}
        </div>
        <div>
        <Link to={`/detail/${_id}`}>
          <p className=' text-md text-blue-500 cursor-pointer w-210 overflow-x-hidden'>
            {caption || "title"}
          </p>
        </Link>
        </div>
      </div>
    )
  }

  return (
    <div className='flex flex-col border-b-2 border-gray-200 pb-6 snap-start'>
      <div>
        <div className='flex gap-3 p-2 cursor-pointer font-semibold rounded '>
          <div className='md:w-16 md:h-16 w-10 h-10'>
            <Link to={`/profile/${ownerId}`}>
              <>
                <Image
                  width={25}
                  height={25}
                  className=' rounded-[50%]'
                  src={ownerImg || '/assets/images/profile.png'}
                  alt='user-profile'
                  layout='responsive'
                />
              </>
            </Link>
          </div>
          <div>
            <Link to={`/profile/${ownerId}`}>
              <div className='flex items-center gap-2'>
                <p className='flex gap-2 items-center md:text-md font-bold text-primary'>
                  {ownerUsername}{' '}
                  <GoVerified className='text-blue-400 text-md' />
                </p>
                <p className='capitalize font-medium text-xs text-gray-500 hidden md:block'>
                  {ownerUsername}
                </p>
              </div>
            </Link>
            <Link to={`/detail/${_id}`}>
              <p className='mt-2 font-normal text-white'>{caption}</p>
            </Link>
          </div>
        </div>
      </div>

      <div className='lg:ml-20 flex gap-4 relative'>
        <div
          onMouseEnter={() => setIsHover(true)}
          onMouseLeave={() => setIsHover(false)}
          className='rounded-3xl'
        >
          <div>
          <AspectRatio ratio={9/16} className='w-[320px]'>
            <video
              loop
              ref={videoRef}
              src={videoUrl}
              onClick={onVideoPress}
              className='lg:w-[600px] h-[300px] md:h-[400px] lg:h-[528px] w-[200px] rounded-2xl cursor-pointer bg-gray-100'
            ></video>
            </AspectRatio>
            </div>

          {isHover && (
            <div className='absolute bottom-6 cursor-pointer left-8 md:left-16 lg:left-0 flex gap-10 lg:justify-start w-[100px] md:w-[50px] lg:w-[600px] p-3 ml-1'>
              {playing ? (
                <>
                 <button onClick={onVideoPress}>
                   <BsFillPauseFill className='text-white text-2xl lg:text-4xl' />
                 </button>
                </>
              ) : (
                <button onClick={onVideoPress}>
                  <BsFillPlayFill className='text-white text-2xl lg:text-4xl' />
                </button>
              )}
              <button onClick={onLikePress}>
              <FaHeart  className={ (isLiked?'text-xl lg:text-2xl text-red':'text-xl lg:text-2xl text-white')}/>
              <p className='text-[15px] text-center text-gray-100'>{likes}</p>
              </button>
              <button onClick={onCommentPress}>
              <MdComment   className={ (isCommentOpen?'text-xl lg:text-2xl text-red':'text-xl lg:text-2xl text-white')}/>
              <p className='text-[15px] text-center text-gray-100'>{likes}</p>
               </button>
              {isVideoMuted ? (
                <button onClick={() => setIsVideoMuted(false)}>
                  <HiVolumeOff className='text-white text-2xl lg:text-4xl' />
                </button>
              ) : (
                <button onClick={() => setIsVideoMuted(true)}>
                  <HiVolumeUp className='text-white text-2xl lg:text-4xl' />
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};



export default VideoCard;