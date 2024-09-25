import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Image, Button, useColorMode } from '@chakra-ui/react'
import { MdDeleteOutline } from "react-icons/md";
import axios from 'axios';
import { CommentContext } from '../contexts/Comments';
import CommentContextprovider from '../contexts/Comments';

const Comment = ({comment,user}) => {

    const {isCommentsChanged,setCommentsChanged} = useContext(CommentContext)

    const [isCurrentuser,setisCurrentuser] = useState(false);
    const [isShowingReply,setisShowingReply] = useState(false);

    const checkUser = () => {
        if(user._id === comment.postedBy && user.username === comment.postedByUsername){
            setisCurrentuser(true);
        }else{
            setisCurrentuser(false);
        }
    }

    const deleteComment = async () => {
        console.log(isCommentsChanged);
        setCommentsChanged(isCommentsChanged+1);
        console.log(isCommentsChanged);
        await axios.post(`${import.meta.env.VITE_BASE_URL}/api/v1/comment/deletecomment`,{
            commentId:comment._id
        })
        .then((res) => {
            console.log(res.data);
        })
        .catch((err) => {
            console.log(err);
        })
    }

    const seeReply = () => {
        if(isShowingReply === true){
            setisShowingReply(false);
        }else{
            setisShowingReply(true);
        }
    }

    const addReply = async () => {
        console.log("you are replying");
        const ele = window.document.getElementById("addCommentInput");
        console.log(ele);
        await axios.post(`${import.meta.env.VITE_BASE_URL}/api/v1/comment/addReply`,{
            repliedBy:postedBy,
            repliedByUsername:postedByUsername,
            userImg:userImg,
            reply:reply,
        })
    }

    useEffect(() => {
        checkUser();
    } , [comment])


  return (
    <CommentContextprovider>
    <div className='my-1 flex flex-row justify-between'>
        <Link to={`/profile/${comment.postedBy}`} >
              <div className="flex flex-row pt-1 mb-1">
                  <Image className='rounded-full h-[25px] w-[25px]'
                    src={comment.userImg }
                    alt='img'
                  />
                  <p className='ml-1 text-xs text-blue-700 font-medium'>@{comment.postedByUsername || "username"}</p>
              </div>
        </Link>
        {
            isCurrentuser ? (
                <>
                <MdDeleteOutline onClick={deleteComment} 
                    className='text-[24px] text-white w-10 h-6 rounded-md bg-gray-600 hover:bg-gray-300 hover:text-black mx-2 '/>
                </>
            ):(
                <>
                </>
            )
        }
    </div>
    <p className=''>{comment.comment}</p>
    {
      isShowingReply ? (
        <>
        <div className='flex flex-row justify-between pr-2'>
        <Link to={'#'} onClick={addReply} >
          <p className='text-xs text-sky-400'>Reply</p>
        </Link>
        <Link to={'#'} onClick={seeReply} >
            <p className='text-xs text-sky-400'>Hide replies</p>
        </Link>
        </div>
        <div>
            {
                comment.replies.map((reply) => (
                    <div className='ml-4'>
                    <Link to={`/profile/${reply.postedBy}`} >
                        <div className="flex flex-row pt-1 mb-1">
                        <Image className='rounded-full h-[25px] w-[25px]'
                            src={reply.userImg }
                            alt='img'
                        />
                        <p className='ml-1 text-xs text-blue-700 font-medium'>@{reply.postedByUsername || "username"}</p>
                        </div>
                    </Link>
                    <p className='text-sm'>{reply.reply}</p>
                    </div>
                ))
            }
        </div>
        </>
      ) : (
           <div className='flex flex-row justify-between pr-2'>
            <Link to={'#'} onClick={addReply} >
              <p className='text-xs text-sky-400'>Reply</p>
            </Link>
            {
                comment.replies.length > 0 ? (
                    <Link to={'#'} onClick={seeReply} >
                        <p className='text-xs text-sky-400'>{`View ${comment.replies.length} more replies`}</p>
                    </Link>
                ):(
                <>
                </>
                )
            }
            </div>
      )
    }
    <hr />
    </CommentContextprovider>
  )
}

export default Comment