import Topbar from "../components/Topbar";
import Secret from "../components/Secret";
import { useState } from "react";

function Dashboard() {
  const [isOpen , setIsOpen] = useState(false);
  const userName= "Rudransh";
  const texts =[
    "I still sleep with a stuffed animal from my childhood, and I'm in my 30s",
    "I'm secretly learning to dance salsa so I can surprise my partner on their birthday",
    " I often tell people I'm allergic to seafood because I just don't like the taste.",
    " I once accidentally broke a friend's expensive vase and blamed it on their cat. ",
    " I pretend to dislike superhero movies, but I've watched all of them multiple times. "
  ] 

  return (
    <div className=" bg-black  h-dvh w-full px-10 ">
      <Topbar />
      <div className="flex justify-center">
         <div className="w-[85%]  ">
         <div className="border-b  w-full flex justify-between pb-2">
            <div className="flex text-white  items-end  ">
            <p>Hello,</p>
            <h1 className="ml-2 text-3xl">{userName}</h1>
            </div>
             <button className="text-white px-4 py-2 bg-grey_custom  rounded-lg " onClick={()=>(setIsOpen(!isOpen))} > Add a secret </button>
          </div>
           <p className="text-white text-center mt-3">Remember - you are not the only one having secrets :)</p>
           <div className={`${isOpen ?"" : "hidden"} p-2 mt-2  text-white w-full bg-grey_custom rounded-md `}>
            <input  className=" w-full bg-transparent border-0 outline-none focus:border-transparent" type="text" placeholder="Type your secret , hit enter to publish" />
           </div>
           <div className="mt-10">
            {texts.map((text,id)=>{
              return(
                <Secret key={id} text={text}/>
              )
            })}
           </div>
         </div>
      </div>
    </div>
  );
}

export default Dashboard;
