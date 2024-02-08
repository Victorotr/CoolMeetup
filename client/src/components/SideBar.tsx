import React,{ FC }  from "react";
import { Handler } from "../context/Context";
import { MdHome, MdPeople, MdAdd, MdLogout } from "react-icons/md";
import { LiaSignInAltSolid } from "react-icons/lia";
import { useNavigate } from "react-router-dom";
import { LogOut } from "../functions/LogOut";

const SideBar: FC = () => {
  const { menuOn, user, setuser, settoast } = Handler();
  const navigate = useNavigate();

  const handleLogOut = async () => {
    LogOut();
    setuser(null);
    settoast({ on: true, type: 'success', text: 'Usuario desconectado' });
  };

  return (
    <div
      className={`${menuOn ? "w-72" : "w-0"} z-50 shadow-2xl transition-all bg-zinc-50 overflow-hidden absolute top-14 right-0 h-full rounded-tl-lg`}
    >
      <ul className="w-full font-Lora text-md font-semibold flex flex-col">
        <li
          onClick={() => navigate("/")}
          className="p-4 border-y transition-all flex items-center justify-start shadow-inner text-zinc-900/90 gap-1 hover:scale-105 cursor-pointer"
        >
          <MdHome />
          Home
        </li>
        <li
          onClick={() => navigate("/list/meetups")}
          className="p-4 border-y transition-all flex items-center justify-start shadow-inner text-zinc-900/90 gap-1 hover:scale-105 cursor-pointer"
        >
          <MdPeople />
          Meetups
        </li>
        <li
          onClick={() => navigate("/new/meetup")}
          className="p-4 border-y transition-all flex items-center justify-start shadow-inner text-zinc-900/90 gap-1 hover:scale-105 cursor-pointer"
        >
          <MdAdd />
          Crear Meetup
        </li>
        {user ? (
          <>
            <li
              onClick={() => navigate(`/user/details/${user?.id}`)}
              className="p-4 border-y transition-all flex items-center justify-start shadow-inner text-zinc-900/90 gap-1 hover:scale-105 cursor-pointer"
            >
            
                <img
                  className="w-8 rounded-full object-cover border border-zinc-400/80"
                  src={user.avatar || '/src/assets/no_picture.png'}
                  alt="Avatar del usuario"
                />
              
              <div className="flex flex-col justify-center items-start">
                <span className="text-sm">{user.username}</span>
                <span className="text-xs font-normal">Ir al perfil</span>
              </div>
            </li>
            <li className="p-4 transition-all flex items-center justify-start shadow-inner text-zinc-900/90 gap-1">
              <div
                onClick={handleLogOut}
                className="p-2 w-full flex items-center justify-start rounded-sm bg-red-500 select-none text-md font-medium text-zinc-50 border-2 border-red-500/90 brightness-90 hover:brightness-100 transition-all cursor-pointer"
              >
                <MdLogout /> Log Out
              </div>
            </li>
          </>
        ) : (
          <li
            onClick={() => navigate("/signin")}
            className="p-4 border-y transition-all flex items-center justify-start shadow-inner text-zinc-900/90 gap-1 hover:scale-105 cursor-pointer"
          >
            <LiaSignInAltSolid /> Signin | Signup
          </li>
        )}
      </ul>
    </div>
  );
};

export default SideBar;
