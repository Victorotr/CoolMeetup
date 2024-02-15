const Footer = () => {
  return (
    <div className=" bg-zinc-900 text-zinc-50 font-Barlow w-full border flex flex-col  mt-10 p-3 px-5 md:px-10 h-full ">
    <div className="max-w-lg w-full mx-auto">
        <h1 className="text-lg font-semibold w-full text-center">
        🗺️ CoolMeetups
        <span className="text-xs translate-y-[10px]">&copy;</span>
      </h1>      <p className="font-medium w-full text-center">Hagamos cosas </p>
      <div className="flex p-2 justify-between items-start">
        <div className="flex flex-col gap-2 justify-center items-center ">
    
          <p className="font-semibold">Navegación</p>
          <ul className="font-medium w-full flex flex-col justify-center gap-2">
            <li className="hover:scale-105 hover:underline transition-all">
              <a href="/">Home</a>
            </li>
            <li className="hover:scale-105 hover:underline transition-all">
              <a href="/list/meetups">Lista</a>
            </li>
            <li className="hover:scale-105 hover:underline transition-all">
              <a href="/new/meetup">Crear </a>
            </li>
          </ul>
        </div>
        <div className="flex flex-col gap-2 justify-center items-center ">
    
    <p className="font-semibold">CoolMeetup</p>
    <ul className="font-medium w-full flex flex-col justify-center gap-2">
      <li className="hover:scale-105 hover:underline transition-all">
        <a href="/">Privacidad</a>
      </li>
     
    </ul>
  </div>
      </div>
    </div>
    </div> 
  );
};

export default Footer;
