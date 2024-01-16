import { BsPersonFillAdd } from "react-icons/bs";
import { BsSoundwave } from "react-icons/bs";
import {useSelector,useDispatch} from 'react-redux'
import avatar from '../assets/avatar.png'


function Topbar({ toggleOpen , setToggleOpen , userData}) {

  return (

    <div className=" py-5 flex justify-between items-center ">
       <div className=" w-auto font-medium text-lg  bg-grey_custom px-5 py-2 rounded-lg text-white">Whispr</div>
       <div className="w-full flex justify-end h-full">
           <img onClick={()=>setToggleOpen(!toggleOpen)} src={avatar} className=" w-12 border border-transparent p-2 rounded-full bg-grey_bg cursor-pointer" alt="" />
       </div>
    </div>
  );
}

export default Topbar;
