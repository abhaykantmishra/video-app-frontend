import axios from "axios"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom";

import { Image,Input } from "@chakra-ui/react";
import NoResults from "./NoResults";
import { LuSendHorizonal } from "react-icons/lu";

const Comments = ({videoId}) => {

  let comments = [{}];
  const [videoComments,setVideoComments] = useState([]);
  const [isCommentsChanged,setCommentsChanged] = useState(0);
  const [commentInput,setCommentInput] = useState("");
  const [replyText,setReplyText] = useState("");
  const [isEditingReply,setIsEditingReply] = useState(false);
  const [ReplyCommentId,setReplyCommentId] = useState('');
  const [isShowingReplies,setIsShowingReplies] = useState(false);

  const user = JSON.parse(window.localStorage.getItem("user"))

  const getAllVideoComments = async () => {
    await axios.post(`${import.meta.env.VITE_BASE_URL}/api/v1/comment/getvideocomment`,{videoId:videoId})
    .then((res) => {
      setVideoComments(res.data.comments)
      // comments =  res.data.comments;
      // console.log(comments);
      // for(let i=0 ; i<comments.length ; i++){
      //   comments[i] = {...comments[i],isShowingReply:false}
      // }
      // setVideoComments(comments);
      // console.log(videoComments);
    })
    .catch((err) => {
      console.log(err);
    })
  }

  const addComment =async (cmtId = "") => {
    await axios.post(`${import.meta.env.VITE_BASE_URL}/api/v1/comment/createcomment`,{
      postedBy:user._id,
      postedByUsername:user.username,
      userImg:user.profileImg,
      postedOn:videoId,
      comment:commentInput,
    })
    .then((res) => {
      console.log(res.data);
      setCommentsChanged(isCommentsChanged+1);
      setCommentInput("");
    })
    .catch((err) => {
      console.log(err);
    })
  }

  const delelteComment = async (commentId) => {
    setCommentsChanged(isCommentsChanged-1);
    await axios.post(`${import.meta.env.VITE_BASE_URL}/api/v1/comment/deletecomment`,{
      commentId:commentId
    })
    .then((res) => {
        console.log(res.data);
    })
    .catch((err) => {
        console.log(err);
    })
  }

  const addReply = async (e) => {
    const commentId = ReplyCommentId;

    videoComments.forEach((cmt) => {
      if(cmt._id === commentId){
        setIsEditingReply(true);
      }else{
        setIsEditingReply(false);
      }
    })
    if(isEditingReply && replyText.trim().length > 0){
      await axios.post(`${import.meta.env.VITE_BASE_URL}/api/v1/comment/addReply`,{
        commentId:commentId,
        postedBy:user._id,
        postedByUsername:user.username,
        userImg:user.profileImg,
        reply:replyText
      })
      .then((res) => {
        console.log(res.data);
        setReplyText('');
        setReplyCommentId('');
        setCommentsChanged(isCommentsChanged+1);
        setIsEditingReply(false);
      })
      .catch((err) => {
        console.log(err);
      })
    }
    
  }

  const viewReplies = (comment) => {
    console.log(comment);
    if(isShowingReplies === false){
      setIsShowingReplies(true)
    }else{
      setIsShowingReplies(false)
    }
  }

  useEffect(() => {
    getAllVideoComments();
  },[isCommentsChanged])

  if(videoComments.length === 0){
    return (
      <>
      <div className="w-full h-full border-[1px] border-white flex flex-col relative">
       <NoResults className="w-full" text={`No comment for this video yet`} />
       <div className="w-full flex flex-row text-white absolute bottom-0">
        <Input type="text"  value={commentInput} 
          onChange={(e) => {setCommentInput(e.target.value)}}
          placeholder="Add a new comment"
          className="text-white inputBox m-1"
        />
        <LuSendHorizonal onClick={addComment} className="text-3xl mt-2 mx-1" />
       </div>
      </div>
      </>
    )
  }

  return (
  <>
  <div className="w-full h-full border-[1px] border-white flex flex-col relative">
  <div className="w-full h-[90%] overflow-y-scroll">
    {
      videoComments.map((comment) => {
        return(
        <div key={comment._id} className="mb-1 ml-2 mt-2">
          <Link to={`/profile/${comment.postedBy}`} >
            <div className="flex flex-row pt-1 mb-1">
                <Image className='rounded-full h-[30px] w-[30px]'
                  src={comment.userImg }
                  alt='img'
                />
                <p className='ml-1 text-sm text-blue-700 font-medium'>@{comment.postedByUsername || "username"}</p>
            </div>
          </Link>
          <p className="text-white">{comment.comment}</p>

          <div className="flex flex-row justify-between">
            <Link to={'#'} onClick={(e) => {
              setReplyCommentId(comment._id)
              setIsEditingReply(true);
              }}>
            <p id={comment._id}  className="text-blue-500 text-xs">Add Reply</p>
            </Link>

            {
              comment.replies.length > 0 ? (
                !isShowingReplies ? (
                  <Link to={'#'} onClick={
                    (e) => {viewReplies(comment)}} 
                  >
                  <p id={comment._id}  className="text-blue-500 text-xs">{`View ${comment.replies.length} more replies`}</p>
                  </Link>
                ) : (
                  <Link to={'#'} onClick={
                    (e) => {viewReplies(comment)}} 
                  >
                  <p id={comment._id}  className="text-blue-500 text-xs">{`Hide replies`}</p>
                  </Link>
                )
              ):(
                <>
                </>
              )
            }
          </div>
          <hr />
          <div >
            {
              isShowingReplies ? (
                <>
                 {
                  comment.replies.map((reply) => (
                    <div key={reply._id} className="ml-4 mb-1">
                      <Link to={`/profile/${comment.postedBy}`} >
                        <div className="flex flex-row pt-1 mb-1">
                            <Image className='rounded-full h-[25px] w-[25px]'
                              src={reply.userImg }
                              alt='img'
                            />
                            <p className='ml-1 text-sm text-blue-700 font-medium'>@{reply.repliedByUsername || "username"}</p>
                        </div>
                      </Link>
                      <div className="flex flex-row">
                        <p className="text-blue-600 text-sm">{`@${reply.repliedByUsername}-> `}</p>
                        <p className="text-white text-sm">{( reply.reply)}</p>
                      </div>
                      <hr />
                    </div>
                  ))
                 }
                </>
              ):(
                <>
                </>
              )
            }
          </div>
        </div>
        )
      })
    }
  </div>
  { !isEditingReply ? (
    <div className="w-full flex flex-row text-white absolute bottom-0">
      <Input type="text"  value={commentInput} 
        onChange={(e) => {setCommentInput(e.target.value)}}
        placeholder="Add a new comment"
        className="text-white inputBox"
      />
      <LuSendHorizonal onClick={addComment} className="text-3xl mt-2 mx-1" />
    </div>
  ) : (
    <div className="w-full flex flex-row text-white absolute bottom-0">
      <Input type="text"  value={replyText} 
        onChange={(e) => {
          setReplyText(e.target.value)
        }}
        placeholder={`Replying to a comment ...`}
        className="text-white inputBox"
      />
      <button onClick={(e) => {
        setIsEditingReply(false)
        setReplyText("");
        setReplyCommentId("");
        setIsEditingReply(false);
        }}
        className="border-white border-[1px] rounded-md m-1 text-xs " 
      >Cancle Replying</button>
      <LuSendHorizonal onClick={addReply} className="text-3xl mt-2 mx-1" />
    </div>
  )
    
  }
  </div>
  </>
  )
}

export default Comments
