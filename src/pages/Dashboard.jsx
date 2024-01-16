import Topbar from "../components/Topbar";
import Secret from "../components/Secret";
import { useEffect, useState } from "react";
import { useNavigate} from 'react-router-dom'
import { motion } from "framer-motion"


import axios from 'axios'
import Sidebar from "../components/Sidebar";
function Dashboard() {
  const [isOpen , setIsOpen] = useState(false);
  const [newSecret , setNewSecret] = useState("");
  const [texts, setTexts] = useState([]);
  const [toogleOpen , setToggleOpen] = useState(false);
  const [userData , setUserData] = useState();
  const navigate = useNavigate();


  const fetchSecrets = async () => {
    try {
      const token = localStorage.getItem('token');
      console.log(token)
      if (!token) {
         navigate('/');
         return;
      }
  
      const response = await axios.get('http://localhost:3000/all-secrets', {
        headers: {
          Authorization: token,
        },
      });
  
      setTexts(response.data.allUsers);
    } catch (error) {
      console.error(error);
    }
  };

  const addSecret = async () => {
    try {
      const token = localStorage.getItem('token');
      const username = localStorage.getItem('email');
  
      if (!token || !username) {
        navigate("/");
        return;
      }
      await axios.post('http://localhost:3000/set-secret', {
        secret: newSecret,
        username: username,
      }, {
        headers: {
          Authorization: token,
        },
      });
      alert('Secret Posted!');
      setNewSecret('');
      setIsOpen(!isOpen);
      const allSecrets = await fetchSecrets();
      setTexts(allSecrets.data.allUsers);
    } catch (e) {
      console.log(e.response);
    }
  };

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const token = localStorage.getItem('token');
        const username = localStorage.getItem('email');
    
        if (!token || !username) {
          return;
        }
    
        const response = await axios.get('http://localhost:3000/current-user', {
          params: {
            username: username,
          },
          headers: {
            Authorization: token,
          },
        });
    
        setUserData(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchUserDetails();
    fetchSecrets();
  }, []);

  // const texts =[
  //   "I still sleep with a stuffed animal from my childhood, and I'm in my 30s",
  //   "I'm secretly learning to dance salsa so I can surprise my partner on their birthday",
  //   " I often tell people I'm allergic to seafood because I just don't like the taste.",
  //   " I once accidentally broke a friend's expensive vase and blamed it on their cat. ",
  //   " I pretend to dislike superhero movies, but I've watched all of them multiple times. "
  // ] 

  return (
    <div className=" bg-black  h-dvh w-full px-5 md:px-10 ">
      {toogleOpen ? <Sidebar userData={userData} toogleOpen={toogleOpen} setToggleOpen={setToggleOpen}/> : ""}
      <Topbar userData={userData} toggleOpen={toogleOpen} setToggleOpen={setToggleOpen} />
      <div className="flex justify-center">
         <div className="w-[85%] md:w-[85%]  mt-4 md:mt-0 ">
         <div className="border-b  w-full flex justify-between pb-2">
            <div className="flex text-white  items-end  ">
            <p className="text-sm md:text-lg ">Hello,</p>
            <h1 className="ml-2 text-xl md:text-3xl ">{ userData && userData.firstName}</h1>
            </div>
             <button className="text-white px-2  py-2 md:px-4 md:py-2 bg-grey_custom  rounded-lg text-[10px] md:text-lg " onClick={()=>(setIsOpen(!isOpen))} > {isOpen ? "Discard this secret" : "Add a secret" } </button>
          </div>
           <p className="text-white text-center mt-3 text-sm md:text-[16px]">Remember - you are not the only one having secrets :)</p>
           {isOpen?<>
            <motion.div initial={{ opacity: 0, scale: 0.5 }}
               animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }} className={`${isOpen ?"" : "hidden"}  md:p-2 mt-4 md:mt-2  flex justify-between items-center text-white w-full bg-grey_custom rounded-md `}>
            <input  value={newSecret} onChange={(e)=>setNewSecret(e.target.value)} className=" text-[10px] w-[50%]  md:text-[16px]  md:w-[80%] bg-transparent border-0 outline-none focus:border-transparent" type="text" placeholder="Type your secret" />
             <button className="text-white px-2 py-2 text-[12px] md:text-[16px] md:px-4 md:py-2 bg-grey_custom  rounded-lg" onClick={()=>addSecret()} >Add a secret</button>
           </motion.div>
           </>:""}
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
