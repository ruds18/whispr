import React from 'react'
import { motion } from "framer-motion"
function Secret({text , username}) {
  return (

    <motion.div  initial={{ opacity: 0, scale: 0.5 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ duration: 0.5 }}
     className=' w-full flex text-[10px] md:text-lg justify-between text-white items-center bg-grey_custom px-2 py-1 md:px-3 md:py-3 rounded-lg mt-5'>" {text} "
     {username===localStorage.getItem("email")?<p className='bg-black p-2 md:px-3 py-2 rounded-lg'>your's 👻</p>:''}
    </motion.div>

  )
}

export default Secret