import { Handler } from "../context/Context";
import { MdHome, MdPeople, MdMap, MdAdd } from "react-icons/md";
import { LiaSignInAltSolid } from "react-icons/lia";
import { useNavigate } from "react-router-dom";
const SideBar = () => {
  const { menuOn } = Handler();
  const navigate = useNavigate();
  return (
    <div
      className={`${
        menuOn ? "w-72" : "w-0"
      } z-50 shadow-2xl transition-all  bg-zinc-50 overflow-hidden  absolute top-14 right-0  h-full rounded-tl-lg`}
    >
      <ul className="w-full font-Lora text-md font-semibold flex flex-col ">
        <li
          onClick={() => navigate("/")}
          className="p-4 border-y transition-all flex items-center justify-start shadow-inner text-zinc-900/90 gap-1 hover:scale-105"
        >
          <MdHome />
          Home
        </li>
        <li
          onClick={() => navigate("/meetups/map")}
          className="p-4 border-y transition-all flex items-center justify-start shadow-inner text-zinc-900/90 gap-1 hover:scale-105"
        >
          <MdMap />
          Mapa
        </li>
        <li
          onClick={() => navigate("/list/meetups")}
          className="p-4 border-y transition-all flex items-center justify-start  shadow-inner text-zinc-900/90 gap-1 hover:scale-105"
        >
          <MdPeople />
          Meetups
        </li>
        <li
          onClick={() => navigate("/new/meetup")}
          className="p-4 border-y transition-all flex items-center justify-start  shadow-inner text-zinc-900/90 gap-1 hover:scale-105"
        >
          <MdAdd />
          Crear Meetup
        </li>
        <li
          onClick={() => navigate("/signin")}
          className="p-4 border-y transition-all flex items-center justify-start  shadow-inner text-zinc-900/90 gap-1 hover:scale-105"
        >
          <LiaSignInAltSolid />
          Signin | Signup
        </li>
      </ul>
    </div>
  );
};

export default SideBar;
