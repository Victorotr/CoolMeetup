//import { useNavigate } from "react-router-dom";
import Marker from '../assets/marker.png'
const Homepage = () => {
  //const navigate = useNavigate();

  return (
    <section className="  min-h-screen w-full mt-10 sm:px-10">
      <div className='flex flex-col items-center sm:flex-row sm:items-center'>
      <h1 className="px-2 font-Lora text-6xl font-extrabold bg-gradient-to-r from-gray-700 via-gray-900 to-black/70 bg-clip-text text-transparent  flex flex-wrap">
      Meetup <br />
      busca eventos <br />cerca de ti 
      </h1>
      <div className="w-52 h-52 ">
        <img
          className=" h-full w-full drop-shadow-2xl"
          src={Marker}
          alt="map marker"
        />
      </div>
      </div>
     
      <div className="bg-[url('./assets/madridmap.png')] w-full h-96 bg-center bg-cover mt-10 "></div>
    </section>
  );
};

export default Homepage;
