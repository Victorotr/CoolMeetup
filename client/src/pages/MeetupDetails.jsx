import axios from "axios";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import nopicture from "../assets/no_meetup_image.png";
import { useNavigate } from "react-router-dom";
import nouserpicure from "../assets/no_picture.png";
import { Handler } from "../context/Context";
import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";

import HandleDate from "../functions/HandleDate";
const MeetupDetails = () => {
  const {toast,settoast} = Handler()
  const { id } = useParams();
  const [meetup, setmeetup] = useState(null);
  const navigate = useNavigate();
  const MeetupInstance = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    withCredentials: true,
  });

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: import.meta.env.VITE_MAPS_TOKEN,
  });

  useEffect(() => {
    const getDetails = async () => {
      try {
        const res = await MeetupInstance.get("/meetup/" + id);

        if (res && res.status === 200) {
          setmeetup(res.data.data);
          console.log(res.data.data)
         
        }
      } catch (error) {
        console.log(error);
      }
    };
    getDetails();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);
  const HandleJoin = async ()=>{
    console.log('clicked');
    try {
       if(!meetup && !meetup.id_meetup){return}
    console.log(meetup)
    const res = await MeetupInstance.get('/signUp/'+ meetup?.id_meetup);
    if(res && res.status === 200 && res.data.message);
      settoast({...toast,on:true,text:res.data.message})
    } catch (error) {
      console.log(error)
    }
   
  }
  return (
    <div className="w-full max-w-xl text-lg flex flex-col mx-auto py-10">
      <img
        className="w-full h-60  object-cover"
        src={meetup?.meetup_image || nopicture}
        alt=""
      />
      <div className="p-2 py-5 flex flex-col gap-2">
        <h1 className="font-Lora text-lg font-semibold">
          {meetup?.meetup_title}
        </h1>
        <p className="font-Lora">{meetup?.meetup_description}</p>
        <div className=" py-2 flex flex-col gap-2">
          <p className="font-Lora font-lg font-semibold">Cuando?</p>
          <p className=" flex  font-medium gap-2">
           {HandleDate(meetup?.meetup_datetime)}
          </p>
        </div>
        <p className="font-Lora font-lg font-semibold">Donde?</p>
        <div className="w-full h-52 max-w-md">
          {isLoaded && (
            <GoogleMap
           
              mapContainerStyle={{ height: "100%", width: "100%" }}
              options={{controlSize:25}}
              zoom={14}
              center={{
                lat: meetup?.x_cordinate,
                lng: meetup?.y_cordinate,
              }}
            >
              {meetup && (
                <Marker
                  position={{
                    lat: meetup.x_cordinate,
                    lng: meetup.y_cordinate,
                  }}
                ></Marker>
              )}
            </GoogleMap>
          )}
        </div> 
        <a
            href={`https://www.google.com/maps?q=${meetup?.x_cordinate},${meetup?.y_cordinate}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <button className="border font-semibold my-5 border-zinc-900/50 rounded-md text-zinc-50 shadow-md bg-blue-500 px-2 py-2 w-full max-w-md">Abrir en Google Maps</button>
          </a>
        <div
          className="flex w-full flex-col items-start justify-start gap-1 p-2 cursor-pointer font-semibold text-md font-Lora"
          onClick={(e) => {
            e.stopPropagation();
            navigate(`/user/details/${meetup?.id_main_user}`);
          }}
        >
          <p>Meetup publicado por </p>
          <div className="flex items-center gap-2">
            <img
              className="w-14 h-14 object-cover rounded-full"
              src={meetup?.picture_url || nouserpicure}
              alt="user picture"
            />
            <p className="font-sans text-lg">{meetup?.user_name}</p>
          </div>
       
        </div>
        <div className="my-4 w-full max-w-md">
          <button
          onClick={HandleJoin} className=" w-full text-center px-3 py-2 text-md font-semibold  text-white bg-indigo-500 rounded-lg hover:bg-orange-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Me Apunto!</button>
         </div>
      </div>
    </div>
  );
};

export default MeetupDetails;
