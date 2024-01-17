import {useState } from "react";
import login_img from "../assets/login.png";
import {Link, useNavigate} from 'react-router-dom'
import  axios  from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function Login() {
  
  const [email , setEmail] = useState("");
  const [password , setPassword] = useState("");
  const [passwordReset , setPasswordReset] = useState(false);
  const navigate = useNavigate();
  const notify = (message) => toast(`${message}`);


  const handlePasswordReset = async(e)=>{
    e.preventDefault();
    notify("clicked")
  try{
    const res = await axios.post('http://localhost:3000/reset-password' , {
        username:email,
        password:password
    });
    localStorage.setItem("email" , email);
    if(res.data && res.data.token){
      localStorage.setItem('token', res.data.token);
    }
    else{
      alert("Token missing!!")
    }
    navigate("/dashboard");
  }
  catch(e){
     console.log(e.response.data)
  }
  }

  const handleLogin = async(e)=>{
    e.preventDefault();
  try{
    const res = await axios.post('http://localhost:3000/login' , {
        username:email,
        password:password
    });
    localStorage.setItem("email" , email);
    if(res.data && res.data.token){
      localStorage.setItem('token', res.data.token);
    }
    else{
      alert("Token missing!!")
    }
    notify("Login success")

    setTimeout(() => {
      navigate("/dashboard");
    }, 2000)
  }
  catch(e){
    notify(e.response.data.message)
     console.log(e.response.data.message)
  }
}



  return (
    // <div className=" text-white w-full h-dvh bg-black p-2 flex justify-between items-center">
      
    //   <div className=" flex items-center justify-center w-full h-full ">
    //     <img className="h-[45rem]" src={login_img} alt="doodle" />
        
    //   </div>
    //   <div className="bg-grey_custom p-6 flex flex-col items-center justify-center h-full w-[80%] rounded-lg">
    //     <h1 className="text-3xl mt-5">Whispr</h1>
    //     <h1  className="text-4xl font-semibold mt-12">{passwordReset ? "Password reset" : "Welcome back!"}</h1>
    //     <p className="mt-4 font-light">  {passwordReset ? "Please enter your new password" : "Please enter your details"} </p>

    //     <form className="h-full w-[60%] mt-14" onSubmit={(e)=>{passwordReset ? handlePasswordReset(e) : handleLogin(e)}} > 
    //       <div className="relative z-0 w-full mb-5 group">
    //         <input
    //           type="email"
    //           name="floating_email"
    //           id="floating_email"
    //           className="block py-2.5 px-0 w-full text-sm text-white  bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
    //           placeholder=" "
    //           required
    //           value={email}
    //           onChange={(e)=>setEmail(e.target.value)}
    //         />
    //         <label
    //           type="floating_email"
    //           className=" text-white peer-focus:font-medium absolute text-sm text-gray-500 dark:text-white duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-black peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
    //         >
    //           Email address
    //         </label>
    //       </div>
    //       <div className="relative z-0 w-full mb-5 group">
    //         <input
    //           type="password"
    //           name="floating_password"
    //           id="floating_password"
    //           className="block py-2.5 px-0 w-full text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
    //           placeholder=" "
    //           required
    //           value={password}
    //           onChange={(e)=>setPassword(e.target.value)}
    //         />
    //         <label
    //           type="floating_password"
    //           className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
    //         >
    //           Password
    //         </label>
    //       </div>
    //        <div className=" w-full  flex justify-between items-center">
    //        <p className="cursor-pointer " onClick={()=>(setPasswordReset(!passwordReset))}>{passwordReset ? "login" : "Forgot password"}</p>
    //         <Link to="/signup" className=" curson-pointer">Signup</Link>    
    //        </div>
    //       <button
    //         type="submit"
    //         className="text-white bg-black px-5 py-4 mt-4 rounded-full w-full"
    //       >
    //         Log In
    //       </button>
    //     </form>
    //     <ToastContainer/>
    //   </div>
    // </div>


<div className="text-white w-full h-screen bg-black p-2 flex flex-col md:flex-row md:justify-between  items-center   ">
  {/* Left side for desktop */}
  <div className="   hidden md:block  flex items-center justify-center w-full h-full">
    <img className="h-[45rem]" src={login_img} alt="doodle" />
  </div>

  {/* Right side */}
  <div className="bg-grey_custom p-6 flex flex-col items-center  w-full md:w-[80%] h-full rounded-lg">
    <h1 className="text-3xl mt-5">Whispr</h1>
    <h1 className="text-4xl font-semibold mt-12">
      {passwordReset ? "Password reset" : "Welcome back!"}
    </h1>
    <p className="mt-4 font-light">
      {passwordReset
        ? "Please enter your new password"
        : "Please enter your details"}
    </p>

    <form
      className="w-full md:w-[60%] mt-14"
      onSubmit={(e) =>
        passwordReset ? handlePasswordReset(e) : handleLogin(e)
      }
    >
      {/* Input fields and labels here... */}

      <div className="relative z-0 w-full mb-5 group">
  <input
    type="email"
    name="floating_email"
    id="floating_email"
    className="block py-2.5 px-0 w-full text-sm text-white  bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
    placeholder=" "
    required
    value={email}
    onChange={(e) => setEmail(e.target.value)}
  />
  <label
    type="floating_email"
    className=" text-white peer-focus:font-medium absolute text-sm text-gray-500 dark:text-white duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-black peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
  >
    Email address
  </label>
</div>
<div className="relative z-0 w-full mb-5 group">
  <input
    type="password"
    name="floating_password"
    id="floating_password"
    className="block py-2.5 px-0 w-full text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
    placeholder=" "
    required
    value={password}
    onChange={(e) => setPassword(e.target.value)}
  />
  <label
    type="floating_password"
    className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
  >
    Password
  </label>
</div>

      
      <div className="w-full flex flex-col md:flex-row justify-between items-center">
        <p
          className="cursor-pointer mb-4 md:mb-0"
          onClick={() => setPasswordReset(!passwordReset)}
        >
          {passwordReset ? "Login" : "Forgot password"}
        </p>
        <Link to="/signup" className="cursor-pointer">
          Signup
        </Link>
      </div>

      <button
        type="submit"
        className="text-white bg-black px-5 py-4 mt-4 rounded-full w-full"
      >
        Log In
      </button>
    </form>
    <ToastContainer />
  </div>
  {/* Left side for mobile */}
  {/* <div className="hidden block md:block sm:block w-full">
    <img className="h-[45rem]" src={login_img} alt="doodle" />
  </div> */}
</div>

  );
}

export default Login;
