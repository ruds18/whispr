import React from 'react';
import {useLayoutEffect,useState,useEffect} from 'react'
import {motion} from 'framer-motion'
import { useNavigate} from 'react-router-dom'


function Sidebar({toogleOpen , setToggleOpen, userData}) {

  const navigate = useNavigate();
  const [width, setWidth] = useState(
    window.innerWidth < 768 ? window.innerWidth * 0.55 : window.innerWidth * 0.3
  );
  const handleLogOut = ()=>{
    localStorage.clear();
    navigate("/");
  }
  return (
    <motion.div  initial={{ width: 0 }}
    animate={{ width: width + "px" }}
     transition={{ duration: 0.2 }}  className=" bg-black absolute right-0   md:w-[20%]   p-4 h-full flex flex-col justify-bewteen  text-white ">
         <div className='' >
                <h1 className='text-[10px] md:text-[16px] '>User Information</h1>
                <h1 className='mt-6 text-[10px] md:text-[16px] '>{userData.firstName}  {userData.lastName}</h1>
                <h1 className='text-[10px] md:text-[16px] '>{userData.username}</h1>
         </div>
         <div className='flex  w-full justify-between'>
            <button className='bg-grey_custom text-[10px] md:text-[16px] px-4 py-3 rounded-lg mt-6' onClick={()=>setToggleOpen(!toogleOpen)} >Close</button>
            <button className='bg-grey_custom px-2 py-2 text-[10px] md:text-[16px]  md:px-4 md:py-3 rounded-lg mt-6' onClick={()=>handleLogOut()} >Log out</button>
         </div>
    </motion.div>
  )
}

export default Sidebar