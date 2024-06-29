import PostForm from "../components/forms/PostForm"
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
function CreatePost() {
 
  return (
    <div className="flex flex-1">
      <div className="common-container">
        <div className="max-w-5xl flex-start gap-3 justify-center w-full">
          <img src="/assets/icons/add-post.svg" 
            width={25}
            height={25}
            alt="add"
          />
          <h2 className="font-bold text-xl text-left w-full">Upload Video</h2>
        </div>

        <PostForm />

      </div>

    </div>
  )
}

export default CreatePost