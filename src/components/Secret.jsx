import React from 'react'

function Secret({text , username}) {
  return (

    <div className=' w-full flex justify-between text-white items-center bg-grey_custom px-3 py-3 rounded-lg mt-5'>" {text} "
     {username===localStorage.getItem("username")?<p className='bg-black p-2 rounded-lg'>your's 👻</p>:''}
    </div>

  )
}

export default Secret