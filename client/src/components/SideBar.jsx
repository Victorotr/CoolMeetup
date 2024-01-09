import { Handler } from "../context/Context";
import { MdHome, MdCalendarMonth, MdPeople } from "react-icons/md";
import { LiaSignInAltSolid } from "react-icons/lia";

const SideBar = () => {
  const { menuOn } = Handler();

  return (
    <div
      className={`${
        menuOn ? "w-72" : "w-0"
      } shadow-2xl transition-all  bg-zinc-50 overflow-hidden  absolute top-14 right-0  h-full rounded-tl-lg`}
    >
      <ul className="w-full font-Lora text-lg font-medium flex flex-col ">
        <li className="p-3 border-y transition-all flex items-center justify-start shadow-inner text-zinc-900/90 gap-1 hover:scale-105">
          <MdHome />
          Home
        </li>
        <li className="p-3 border-y transition-all flex items-center justify-start shadow-inner text-zinc-900/90 gap-1 hover:scale-105">
          <MdCalendarMonth />
          Eventos
        </li>
        <li className="p-3 border-y transition-all flex items-center justify-start  shadow-inner text-zinc-900/90 gap-1 hover:scale-105">
          <MdPeople />
          Meetups
        </li>
        <li className="p-3 border-y transition-all flex items-center justify-start  shadow-inner text-zinc-900/90 gap-1 hover:scale-105">
          <LiaSignInAltSolid />
          Signin | Signup
        </li>
      </ul>
    </div>
  );
};

export default SideBar;
