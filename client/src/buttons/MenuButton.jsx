import {useEffect} from 'react'
import { MdMenu,MdClose } from "react-icons/md";
import { Handler } from '../context/Context';
const MenuButton = () => {
const {menuOn,setmenuOn}= Handler();

useEffect(() => {
  console.log(menuOn)
}, [menuOn])


 return (
    <div 
    onClick={(e)=>{e.stopPropagation();setmenuOn(!menuOn)}}
    className={`${menuOn ? 'menuon' : 'menuoff'} z-50 text-shadow flex flex-col items-center justify-between h-11 select-none`}>
    {menuOn ? <MdClose size={40} /> : <MdMenu size={40}/>}

    <span className='text-xs'>{menuOn? 'cerrar' : 'menu'}</span>
    </div>
  )
}

export default MenuButton
