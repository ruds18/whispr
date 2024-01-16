import React from 'react'
import {motion} from 'framer-motion'
import { useNavigate} from 'react-router-dom'


function Sidebar({toogleOpen , setToggleOpen,userData}) {
  const navigate = useNavigate();
  const handleLogOut = ()=>{
    localStorage.clear();
    navigate("/");
  }
  return (
    <motion.div  initial={{ width: 0 }}
    animate={{ width: 300 }}
     transition={{ duration: 0.1 }}  className=" bg-black absolute right-0 w-[20%]  p-4 h-full flex flex-col justify-bewteen  text-white ">
         <div className='' >
                <h1>User Information</h1>
                <h1 className='mt-6'>{userData.firstName}  {userData.lastName}</h1>
                <h1>{userData.username}</h1>
         </div>
         <div className='flex  w-full justify-between'>
            <button className='bg-grey_custom px-4 py-3 rounded-lg mt-6' onClick={()=>setToggleOpen(!toogleOpen)} >Close</button>
            <button className='bg-grey_custom px-4 py-3 rounded-lg mt-6' onClick={()=>handleLogOut()} >Log out</button>
         </div>
    </motion.div>
  )
}

export default Sidebar