import React, { useEffect, useState } from 'react';
import { Image,Input,InputRightElement,InputGroup,Button} from '@chakra-ui/react';
import { Link, Navigate } from 'react-router-dom';
import { useLocation,useNavigate } from 'react-router-dom';
// import { useRouter } from 'next/router';
import { BiLocationPlus } from 'react-icons/bi';
import { AiOutlineLogout } from 'react-icons/ai';
import { BiSearch } from 'react-icons/bi';
import { IoMdAdd } from 'react-icons/io';
import { GoogleLogin, googleLogout  } from '@react-oauth/google';

// import useAuthStore from '../store/authStore';
// import { IUser } from '../types';
// import { createOrGetUser } from '../utils';
import Logo from '/assets/images/logo.png';
import axios from 'axios';

const Navbar = () => {
  const [user, setUser] = useState({});
  const [searchValue, setSearchValue] = useState('');
  const [isPathChanged,setChangeInpath] = useState(false);
  const navigate = useNavigate();
//   const { userProfile, addUser, removeUser } = useAuthStore();
    const userProfile = 'abc';
    const addUser = ()=>{console.log("adduser function called")}

    const removeUser = async ()=>{
          const logoutUrl = `${import.meta.env.VITE_BASE_URL}/api/v1/user/logout`;
          const token = localStorage.getItem("accessToken");
          if(!token){
            console.log(" No user Logged In")
            navigate('/login')
            return ;
          }
         localStorage.clear();
         navigate('/login')
    }
    
  
  useEffect(() => {
    setUser(userProfile);
  }, [userProfile,isPathChanged]);

  const handleSearch = (e) => {
    e.preventDefault();
    if(searchValue) {
      navigate(`search/${searchValue}`);
    }
  };

  return (
    <div className='w-full flex justify-between items-center border-b-2 border-gray-200 py-2 px-4'>
      <Link to='/'>
        <div className='w-[50px]'>
          <Image
            className='cursor-pointer rounded-full'
            src={Logo}
            alt='logo'
            layout='responsive'
          />
        </div>
      </Link>

      <div className='relative hidden md:block rounded-lg w-full mx-20'>
        <form
          onSubmit={handleSearch}
          className='absolute  md:static top-10 -left-20'
        >
          <InputGroup>
             <Input placeholder='Search accounts and videos'  size='lg'
             className='w-full text-white rounded-md'
              value={searchValue}
              onChange={(e) => {setSearchValue(e.target.value)}} />
            </InputGroup>
          <button
            onClick={handleSearch}
            className='absolute md:right-5 right-6 top-4 border-l-2 border-gray-300 pl-4 text-2xl text-gray-400'
          >
            <BiSearch />
          </button>
        </form>
      </div>

      <div>
        {user ? (
          <div className='flex gap-5 md:gap-10'>
            <Link to='/createpost'>
              <Button className='border-2 bg-red-600 px-2 md:px-4 text-md font-semibold flex items-center gap-2'>
                <IoMdAdd className='text-xl ' />{' '}
                <span className='hidden md:block'>Upload </span>
              </Button>
            </Link>
            {user.image && (
              <Link to={`/profile/${user._id}`}>
                <div>
                  <Image
                    className='rounded-full cursor-pointer'
                    src={user.image}
                    alt='user'
                    width={40}
                    height={40}
                  />
                </div>
              </Link>
            )}
              <button
                type='button'
                className=' border-2 p-2 rounded-full cursor-pointer outline-none shadow-md'
                onClick={() => {
                  googleLogout();
                  removeUser();
                }}
              >
                <AiOutlineLogout color='red' fontSize={21} />
              </button>
          </div>
        ) : (
            <GoogleLogin
              onSuccess={(response) => createOrGetUser(response, addUser)}
              onError={() => console.log('Login Failed')}
            />
        )}
      </div>
    </div>
  );
};

export default Navbar;
