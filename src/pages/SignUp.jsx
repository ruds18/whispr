import { useState } from "react";
import login_img from "../assets/login.png";
import {Link, useNavigate} from 'react-router-dom'
import axios from 'axios'
function Login() {
    const [email , setEmail] = useState("");
    const [password , setPassword] = useState("");
    const [firstName , setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const navigate = useNavigate();

const handleSignUp = async(e)=>{
    e.preventDefault();
  try{
    const res = await axios.post('http://localhost:3000/register' , {
        username:email,
        password:password,
        firstName:firstName,
        lastName:lastName
    });
    localStorage.setItem("email", email);
    localStorage.setItem("name", firstName);

    if(res.data && res.data.token){
      localStorage.setItem('token', res.data.token);
    }
    else{
      alert("Token missing!!")
    }
    navigate("/dashboard")

  }
  catch(e){
     console.log(e.response);
  }
}

  return (
    <div className=" text-white w-full h-dvh bg-black p-2 flex justify-between items-center">
      <div className=" flex items-center justify-center w-full h-full ">
        <img className="h-[45rem]" src={login_img} alt="doodle" />
      </div>
      <div className="bg-grey_custom p-6 flex flex-col items-center justify-center h-full w-[80%] rounded-lg">
        <h1 className="text-3xl mt-5">Whispr</h1>
        <h1  className="text-4xl font-semibold mt-12">Welcome</h1>
        <p className="mt-4 font-light">Please enter your details</p>

        <form className="h-full w-[60%] mt-14" onSubmit={(e)=>handleSignUp(e)}>
        <div className="relative z-0 w-full mb-5 justify-between flex" >
          <div className="w-[45%]">
          <input
              type="text"
              name="floating_email"
              id="floating_email"
              className="block py-2.5 px-0 w-full text-sm text-white   bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark: dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              required
              value={firstName}
              onChange={(e)=>setFirstName(e.target.value)}
            />
            <label
              type="floating_email"
              className="  peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus: peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              First name
            </label>
          </div>
          <div className="w-[45%]">
          <input
              type="text"
              name="floating_email"
              id="floating_email"
              className="block py-2.5 px-0 w-full text-sm text-white   bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark: dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              required
              value={lastName}
              onChange={(e)=>setLastName(e.target.value)}
            />
            <label
              type="floating_email"
              className="  peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus: peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Last name
            </label>
          </div>
          </div>
          <div className="relative z-0 w-full mb-5 group">
            <input
              type="email"
              name="floating_email"
              id="floating_email"
              className="block py-2.5 px-0 w-full text-sm text-white   bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark: dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              required
              value={email}
              onChange={(e)=>setEmail(e.target.value)}
            />
            <label
              type="floating_email"
              className="  peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus: peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Email address
            </label>
          </div>
          <div className="relative z-0 w-full mb-5 group">
            <input
              type="password"
              name="floating_password"
              id="floating_password"
              className="block py-2.5 px-0 w-full text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark: dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=""
              required
              value={password}
              onChange={(e)=>setPassword(e.target.value)}
            />
            <label
              type="floating_password"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Password
            </label>
          </div>
          <p className="cursor-pointer"><Link to="/">Already an user?</Link></p>
          
          <button
            type="submit"
            className="text-white bg-black px-5 py-4 mt-4 rounded-full w-full"
          >
            Sign up
          </button>
        </form>
        
      </div>
    </div>
  );
}

export default Login;
