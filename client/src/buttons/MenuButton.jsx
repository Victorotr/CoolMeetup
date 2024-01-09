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
    onClick={()=>setmenuOn(!menuOn)}
    className={`${menuOn ? 'menuon' : 'menuoff'} flex flex-col  items-center justify-end h-10 select-none`}>
    {menuOn ? <MdClose size={45} /> : <MdMenu size={45}/>}

    <span className='text-xs'>{menuOn? 'cerrar' : 'menu'}</span>
    </div>
  )
}

export default MenuButton
