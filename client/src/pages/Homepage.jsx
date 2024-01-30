import { useNavigate } from "react-router-dom";
import Marker from "../assets/marker.png";
import { Handler } from "../context/Context";
const Homepage = () => {
  const navigate = useNavigate();
  const {settoast} = Handler();

  return (
    <section className={`relative min-h-screen w-full pt-10  max-w-4xl mx-auto blur-0`}>
      <div className="z-10 absolute top-0 left-0 w-full h-full flex justify-around">
        <span className="h-full w-[1px] border-dashed  border border-zinc-900/20"></span>
        <span className="h-full w-[1px] border-dashed  border border-zinc-900/20"></span>
        <span className="h-full w-[1px] border-dashed  border border-zinc-900/20"></span>
      </div>
      <div className="z-10 absolute top-0 left-0 w-full h-full flex flex-col justify-around">
        <span className="w-full h-[1px] border-dashed  border border-zinc-900/20"></span>
        <span className="w-full h-[1px] border-dashed  border border-zinc-900/20"></span>
        <span className="w-full h-[1px] border-dashed  border border-zinc-900/20"></span>
        <span className="w-full h-[1px] border-dashed border border-zinc-900/20"></span>
      </div>
      <div className="z-20 flex flex-row items-center justify-between sm:flex-row sm:items-center px-4">
        <h1 className="text-shadow px-2 font-Lora text-5xl sm:text-6xl font-extrabold bg-gradient-to-r from-gray-700 via-gray-900 to-black/70 bg-clip-text text-transparent  flex flex-wrap">
          Meetup, <br />
          busca eventos <br />
          cerca de ti
        </h1>
        <div className="z-20 w-40 sm:w-44 translate-x-[-10px]  object-cover custom-drop-shadow">
          <img
            className=" h-full w-full drop-shadow-2xl animate-bounce-slow "
            src={Marker}
            alt="map marker"
          />
        </div>
      </div>
      <div 
      onClick={()=>navigate('/list/meetups')}
      className="px-6 mt-5">
        <div className=" p-1 shadow-xl rounded-md flex items-center justify-center bg-gradient-to-r from-red-500 via-red-500 to-amber-500 w-52"> 
        <button className="z-10 px-3 py-1 text-zinc-900/90 bg-zinc-50 rounded-sm border w-full h-full font-medium">Busca MeetUps</button></div>
       
      </div>

      <div 
      onClick={()=>{settoast({on:true,type:'warning',text:'Este mapa es un mapa explicativo, para ver los meetups haz click en el botón arriba :)'})}}
      className="z-50 shadow-lg bg-[url('./assets/madridmap.png')] w-full h-96 bg-center bg-cover mt-10 relative">
      <img className="w-6 absolute top-20 right-32" src={Marker} alt="marker" />
      <img className="w-6 absolute bottom-20 left-52" src={Marker} alt="marker" />
      <img className="w-6 absolute top-40 left-32" src={Marker} alt="marker" />
      <img className="w-6 absolute top-32 right-60 " src={Marker} alt="marker" />
      </div>
    </section>
  );
};

export default Homepage;
