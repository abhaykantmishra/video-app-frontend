import axios from "axios";

async function loginUser (username,password) {
    const loginUrl = `${import.meta.env.VITE_BASE_URL}/api/v1/user/login`
    try {
        const res =  await axios.post(loginUrl , 
           { username:username,password:password }
        ).then((response) => {
           console.log(response)
           localStorage.setItem("user",JSON.stringify(response.data.user))
           localStorage.setItem("userId" , response.data.user._id )
           localStorage.setItem("accessToken", response.data.accessToken)
           return response;
        }).catch((error) => {
            console.log(error);
            return error
        })
    } catch (error) {
        console.log(error);
        return null
    }

}

export {
    loginUser
}
