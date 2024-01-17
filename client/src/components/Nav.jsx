import LoginButton from "../buttons/LoginButton";
import MenuButton from "../buttons/MenuButton";
import ImgMap from "../assets/map.png";
import SignupButton from "../buttons/SignupButton";
import { useNavigate } from "react-router-dom";
import { Handler } from "../context/Context";
import { FaUser } from "react-icons/fa";

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
        <p className="hidden sm:flex">Cool Meetups</p>
      </div>
      <div className="hidden sm:flex ">
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
            onClick={() => navigate("/meetups/map")}
            className="p-3 text-shadow-medium  transition-all flex items-center justify-start  gap-1 hover:scale-105"
          >
            Mapa
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
        <div className="flex items-center gap-1">
          <div className="p-4 border-y transition-all flex items-center justify-start  shadow-inner text-zinc-900/90 gap-1 hover:scale-105">
            <FaUser />
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
