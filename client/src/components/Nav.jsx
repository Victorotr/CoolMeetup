import LoginButton from '../buttons/LoginButton'
import MenuButton from '../buttons/MenuButton'

// @ts-ignore
import ImgMap from '../assets/map.png'
import SignupButton from '../buttons/SignupButton'
const Nav = () => {
  return (
    <header className='h-14 flex items-center justify-between px-3'>
    <div className='font-semibold font-xl flex items-center gap-2 font-Lora'>
    <img className='w-10 h-10' src={ImgMap} alt="mapa"  /> 
    <p className='hidden sm:flex'>Cool Meetups</p>
    </div>
    <div className='hidden sm:flex '>
    <ul className="w-full font-Lora text-lg font-semibold flex  text-zinc-900/90">
        <li className="p-3 transition-all flex items-center justify-start  gap-1 hover:scale-105">
        
          Home
        </li>
        <li className="p-3  transition-all flex items-center justify-start  gap-1 hover:scale-105">
          
          Eventos
        </li>
        <li className="p-3 transition-all flex items-center justify-start   gap-1 hover:scale-105">
       
          Meetups
        </li>
      
      </ul>
    </div>
    <div className='flex items-center '>
    <LoginButton />
    <SignupButton/>
    <MenuButton/>
    </div>
    </header>
  )
}

export default Nav
