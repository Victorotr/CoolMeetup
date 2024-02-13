import React,{ FC } from "react";
import LoginButton from "../buttons/LoginButton";
import MenuButton from "../buttons/MenuButton";
import SignupButton from "../buttons/SignupButton";
import { useNavigate } from "react-router-dom";
import { Handler } from "../context/Context";
import { MdHome, MdPeople, MdAdd } from "react-icons/md";

const Nav: FC = () => {
  const navigate = useNavigate();
  const { user } = Handler();

  return (
    <header className="max-w-6xl mx-auto h-14 flex items-center justify-between px-3">
      <div
        onClick={() => navigate("/")}
        className="font-semibold text-lg flex items-center gap-2  cursor-pointer"
      >
        <img className="w-8 h-8 drop-shadow-lg" src='/map.png' alt="mapa" />
        <p className="text-zinc-900/80 text-md ">Cool Meetups</p>
      </div>
      <div className="hidden md:flex  max-w-sm w-full rounded-full">
        <ul className="w-full justify-between  gap-2  text-md font-semibold flex text-zinc-900/80 ">
          <li
            onClick={() => navigate("/")}
            className="p-3 text-shadow-medium transition-all flex items-center justify-start gap-1 hover:scale-105 cursor-pointer"
          >
          <MdHome/>  Home
          </li>
          <li
            onClick={() => navigate("/list/meetups")}
            className="p-3 text-shadow-medium transition-all flex items-center justify-start gap-1 hover:scale-105 cursor-pointer"
          >
          <MdPeople />  Meetups
          </li>
          <li
            onClick={() => navigate("/new/meetup")}
            className="p-3 text-shadow-medium transition-all flex items-center justify-start gap-1 hover:scale-105 cursor-pointer"
          >
          <MdAdd/> Crear
          </li>
        </ul>
      </div>
      {user ? (
        <div
          onClick={() => navigate(`/user/details/${user?.id}`)}
          className="flex items-center gap-1 cursor-pointer"
        >
          <div className="p-3 transition-all text-sm sm:text-md cursor-pointer flex items-center justify-start font-medium shadow-inner text-zinc-900/80 gap-1 hover:scale-105">
              <img
                className="w-8 h-8 rounded-full object-cover border border-zinc-400/80"
                src={user.avatar || '/src/assets/no_picture.png'}
                alt="Avatar del usuario"
              />
      
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
