import {useState, createContext, useContext } from "react";


export const CommentContext = createContext();

const CommentContextprovider = ({children}) => {
    const [isCommentsChanged,setCommentsChanged] = useState(0);
    const [videoComments,setVideoComments] = useState([]);

    return (
        <CommentContext.Provider value={{isCommentsChanged,setCommentsChanged,videoComments,setVideoComments}}>
            {children}
        </CommentContext.Provider>
    )
}

export default CommentContextprovider;