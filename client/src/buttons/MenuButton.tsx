import React, { ReactElement } from "react";
import { MdMenu, MdClose } from "react-icons/md";
import { Handler } from '../context/Context';

const MenuButton: React.FC = (): ReactElement => {
  const { menuOn, setmenuOn } = Handler();

  const handleButtonClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    setmenuOn(!menuOn);
  };

  return (
    <div
      onClick={handleButtonClick}
      className={`${menuOn ? 'menuon' : 'menuoff'} z-50 text-shadow flex flex-col items-center justify-between h-11 select-none`}
    >
      {menuOn ? <MdClose size={40} /> : <MdMenu size={40} />}

      <span className='text-xs'>{menuOn ? 'cerrar' : 'menu'}</span>
    </div>
  );
};

export default MenuButton;
