import Topbar from "../components/Topbar";
import Secret from "../components/Secret";
import { useEffect, useState } from "react";
import axios from 'axios'
function Dashboard() {
  const [isOpen , setIsOpen] = useState(false);
  const [newSecret , setNewSecret] = useState("");
  const [texts, setTexts] = useState([]);
  const addSecret = async()=>{
    try{
      const res = await axios.post('http://localhost:3000/set-secret' , {
        secret:newSecret,
        username:localStorage.getItem("username")
      })
      const allSecrets = await axios.get('http://localhost:3000/all-secrets');
       setTexts(allSecrets.data.allUsers);
      alert("Secret Posted!")
      setNewSecret("");
      setIsOpen(!isOpen);
    }
    catch(e){
      console.log(e.response);
    }
  }

  useEffect(() => {
    const fetchSecrets = async () => {
      try {
        const response = await axios.get('http://localhost:3000/all-secrets')
        setTexts(response.data.allUsers);
      } catch (error) {
        console.error(error);
      }
    };

    fetchSecrets();
  }, []);

  const userName= localStorage.getItem("name");
  // const texts =[
  //   "I still sleep with a stuffed animal from my childhood, and I'm in my 30s",
  //   "I'm secretly learning to dance salsa so I can surprise my partner on their birthday",
  //   " I often tell people I'm allergic to seafood because I just don't like the taste.",
  //   " I once accidentally broke a friend's expensive vase and blamed it on their cat. ",
  //   " I pretend to dislike superhero movies, but I've watched all of them multiple times. "
  // ] 

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
             <button className="text-white px-4 py-2 bg-grey_custom  rounded-lg " onClick={()=>(setIsOpen(!isOpen))} > {isOpen ? "Discard this secret" : "Add a secret" } </button>
          </div>
           <p className="text-white text-center mt-3">Remember - you are not the only one having secrets :)</p>
           <div className={`${isOpen ?"" : "hidden"} p-2 mt-2  flex justify-between items-center text-white w-full bg-grey_custom rounded-md `}>
            <input  value={newSecret} onChange={(e)=>setNewSecret(e.target.value)} className=" w-[80%] bg-transparent border-0 outline-none focus:border-transparent" type="text" placeholder="Type your secret , hit enter to publish" />
             <button className="text-white px-4 py-2 bg-grey_custom  rounded-lg" onClick={()=>addSecret()} >Add a secret</button>
           </div>
           <div className="mt-10">
            {texts.map((text,id)=>{
              return(
                <Secret key={id} username={text.username} text={text.secret}/>
              )
            })}
           </div>
         </div>
      </div>
    </div>
  );
}

export default Dashboard;
