import React from 'react';
import { Link } from 'react-router-dom';
// import { useRouter } from 'next/router';
import { useLocation } from 'react-router-dom';

import { topics } from '../utils/constants';

const Discover= () => {
  const router = useLocation();

  const { topic } = {
    1:'a',
    2:'d',
    3:'c',
    4:'b',
  };

  const activeTopicStyle = 'xl:border-2 hover:bg-primary xl:border-[#F51997] px-3 py-2 rounded xl:rounded-full flex items-center gap-2 justify-center cursor-pointer text-[#F51997]';
  const topicStyle = 'xl:border-2 hover:bg-primary xl:border-gray-300 px-3 py-2 rounded xl:rounded-full flex items-center gap-2 justify-center cursor-pointer text-black';

  return (
    <div className='xl:border-b-2 xl:border-gray-200 pt-6 pb-6'>
      
      <div className='flex gap-3 flex-wrap'>
        {topics?.map((item) => (
          <Link to={`/?topic=${item.name}`} key={item.name}>
            <div className={topic === item.name ? activeTopicStyle : topicStyle}>
              <span className='text-sky-500 font-bold text-2xl xl:text-md '>
                {item.icon}
              </span>
              <span className={`font-medium text-blue-400 text-md hidden xl:block capitalize`}>
                {item.name}
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Discover;