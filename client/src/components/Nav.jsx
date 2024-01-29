import LoginButton from "../buttons/LoginButton";
import MenuButton from "../buttons/MenuButton";
import ImgMap from "../assets/map.png";
import SignupButton from "../buttons/SignupButton";
import { useNavigate } from "react-router-dom";
import { Handler } from "../context/Context";
import nouser from '../assets/no_picture.png';

const Nav = () => {
  const navigate = useNavigate();
  const { user } = Handler();
  

  return (
    <header className=" max-w-4xl mx-auto h-14 flex items-center justify-between px-3">
      <div
        onClick={() => navigate("/")}
        className="font-semibold text-xl flex items-center gap-2 font-Lora"
      >
        <img className="w-10 h-10" src={ImgMap} alt="mapa" />
        <p className="text-zinc-900/80 text-m">Cool Meetups</p>
      </div>
      <div className="hidden md:flex ">
        <ul className="w-full font-Lora text-md font-semibold flex  text-zinc-900/80">
          <li
            onClick={() => navigate("/")}
            className="p-3 text-shadow-medium transition-all flex items-center justify-start  gap-1 hover:scale-105"
          >
            Home
          </li>
          <li
            onClick={() => navigate("/list/meetups")}
            className="p-3 text-shadow-medium transition-all flex items-center justify-start  gap-1 hover:scale-105"
          >
            Meetups
          </li>
         
          <li
            onClick={() => navigate("/new/meetup")}
            className="p-3 text-shadow-medium transition-all flex items-center justify-start   gap-1 hover:scale-105"
          >
            Crear
          </li>
        </ul>
      </div>
      {user ? (
        <div 
        onClick={()=>navigate(`/user/details/${user?.id}`)}
        className="flex items-center gap-1">
          <div className="p-3  transition-all cursor-pointer flex items-center justify-start font-medium shadow-inner text-zinc-900/80 gap-1 hover:scale-105">
             {user.avatar? <img className="w-8 rounded-full object-cover border border-zinc-400/80" src={user.avatar} />: <img className="w-8 rounded-full object-cover border border-zinc-400/80" src={nouser} />}
            {user.username}
          </div>
          <MenuButton />
        </div>
      ) : (
        <div className="flex items-center gap-1">
          <LoginButton />
          <SignupButton />
          <MenuButton />
        </div>
      )}
    </header>
  );
};

export default Nav;
