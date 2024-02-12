import NotFoundImg from "../assets/notfound.png";
import { useNavigate } from "react-router-dom";
const MeetupNotFound = () => {
  const navigate = useNavigate();
  return (
    <section className="m-auto py-20  max-w-lg flex flex-col items-center justify-center">
      <img src={NotFoundImg} className="" alt="not found" />
      <p className="text-2xl font-semibold ">Ups! Meetup no encontrado...</p>
      <button
      onClick={()=>{navigate('/list/meetups')}}
      className="border-2 border-zinc-900/70 mt-5 p-2 rounded-md font-semibold">Volvér a la lista de Meetups</button>
    </section>
  );
};

export default MeetupNotFound;
