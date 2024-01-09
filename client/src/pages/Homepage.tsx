import React from "react";
import { useNavigate } from "react-router-dom";
const Homepage = () => {
  const navigate = useNavigate();

  return (
    <div className="p-5 ">
      <p className=" text-6xl font-bold bg-gradient-to-r from-gray-700 via-gray-900 to-black bg-clip-text text-transparent">
        Hi! <br /> Welcome to CoolMeetups!
      </p>
      <button 
      onClick={()=>navigate('/test')}
      className="border-2 border-blue-500/70 p-2 rounded-lg text-zinc-900/70">
        Go to another page
      </button>
    </div>
  );
};

export default Homepage;
