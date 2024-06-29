import React, { useState } from 'react';
import { Router, useLocation, useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { AiFillHome, AiOutlineMenu } from 'react-icons/ai';
import { ImCancelCircle } from 'react-icons/im';
import { FaUserLarge } from "react-icons/fa6";
import { BsSaveFill } from "react-icons/bs";

import SuggestedAccounts from './SuggestedAccounts';
import Discover from './Discover';
import Footer from './Footer';
// import useAuthStore from '../store/authStore';
const Sidebar = () => {
  const navigate = useNavigate()
  const [showSidebar, setShowSidebar] = useState(true);
  const { pathname } = useLocation();
//   const { fetchAllUsers, allUsers } = useAuthStore();
    const fetchAllUsers = {u1:'a' , u2:'b'}
    const allUsers = {u1:'a' , u2:'b'}
    const userId = localStorage.getItem("userId");
    const onProfileClick = ()=>{
      navigate(`/profile/${userId}`);
    }

  const activeLink = 'flex items-center gap-3 hover:bg-primary p-3 justify-center xl:justify-start cursor-pointer font-semibold text-[#F51997] rounded';

  const normalLink = 'flex items-center gap-3 hover:bg-primary p-3 justify-center xl:justify-start cursor-pointer font-semibold rounded';

  return (
    <div>
      <div
        className='block xl:hidden m-2 ml-4 mt-3 text-xl'
        onClick={() => setShowSidebar(!showSidebar)}
      >
        {showSidebar ? <ImCancelCircle /> : <AiOutlineMenu />}
      </div>
      {showSidebar && (
        <div className='xl:w-[300px] w-20 flex flex-col justify-start mb-10 border-r-2 border-gray-100 xl:border-0 p-3 '>
          <div className='xl:border-b-2 border-gray-200 xl:pb-4'>
            <Link to='/'>
              <div className={pathname === '/' ? activeLink : normalLink}>
                <p className='text-xl'>
                  <AiFillHome />
                </p>
                <span className='text-lg hidden xl:block'>
                    Home
                </span>
              </div>
            </Link>
            <Link to='/saved'>
              <div className={pathname === '/saved' ? activeLink : normalLink}>
                <p className='text-lg'>
                <BsSaveFill />
                </p>
                <span className='text-lg hidden xl:block'>
                    Saved
                </span>
              </div>
            </Link>
          </div>
          
          <Discover />
          <Link to={`/profile/${userId}`}>
              <div className={pathname === `/profile/${userId}` ? activeLink : normalLink}>
                <p className='text-xl'>
                <FaUserLarge onClick={onProfileClick} />
                </p>
                <span className='text-lg hidden xl:block'>
                    Profile
                </span>
              </div>
            </Link>
        </div>
      )}
    </div>
  );
};

export default Sidebar;