import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import nopicture from "../assets/no_meetup_image.png";
import { useNavigate } from "react-router-dom";
import nouserpicure from "../assets/no_picture.png";
import { Handler } from "../context/Context";
import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";
import HandleDate from "../functions/HandleDate";
import { Instance } from "../axios/Instance";

const MeetupDetails = () => {

  const [JoinLoading, setJoinLoading] = useState(false);
  const { toast, settoast, user, accessLoading } = Handler();
  const { id } = useParams();
  const [meetup, setmeetup] = useState(null);
  const [userJoined, setuserJoined] = useState(false);
  const [isOutDated, setisOutDated] = useState(false);
  const navigate = useNavigate();
  
  useEffect(() => {
    if (!user && !accessLoading) {
      settoast({
        on: true,
        type: "warning",
        text: "Accede o registrate para ver los detalles de un meetup",
      });
      navigate("/signin");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [accessLoading, user]);


  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: import.meta.env.VITE_MAPS_TOKEN,
  });

  useEffect(() => {
    if (JoinLoading) {
      return;
    }
    const getDetails = async () => {
      try {
        const res = await Instance.get("/meetup/" + id);

        if (res && res.status === 200) {
          setmeetup(res.data.data);
        }
      } catch (error) {
        console.log(error);
      }
    };

    getDetails();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, JoinLoading]);
  const HandleJoin = async () => {
    try {
      if (!meetup && !meetup.id_meetup) {
        return;
      }

      setJoinLoading(true);
      const res = await Instance.get("/signUp/" + meetup?.id_meetup);
      if (res && res.status === 200 && res.data.message);
      settoast({ ...toast, on: true, text: res.data.message });
      setJoinLoading(false);
    } catch (error) {
      console.log(error);
      settoast({ ...toast, on: true, type: "error", text: "Algo ha ido mal" });
    }
  };
  useEffect(() => {
    if (!user || JoinLoading) {
      return;
    }
   
    if (meetup && meetup.assistants) {
      const now = new Date();
      const meetupDate = new Date(meetup.meetup_datetime);
      now > meetupDate && setisOutDated(true);

      const assistants = meetup.assistants || null;
      const userIsIn = assistants.some((item) => item.id_user === user.id);
      userIsIn ? setuserJoined(true) : setuserJoined(false);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [meetup, user, JoinLoading]);
  const HandleDelete = async () => {
    if (!meetup && !meetup.id_meetup) {
      return;
    }
    try {
      setJoinLoading(true)
      const res = await Instance.post("/cancel/meetup", {
        meetup_id: meetup.id_meetup,
      });
 
     
      if(res && res.status === 200){
        console.log(res.data)
        settoast({on:true,type:res.data.data.done ? 'success': 'warning',text:res.data.data.message})
      }
     
    } catch (error) {
      console.log(error)
    }finally{
      setJoinLoading(false)
    }
  };
  return (
    <div className={`${isOutDated || meetup?.cancelled? 'opacity-70' : ''} w-full max-w-lg text-lg flex flex-col mx-auto py-10`}>
      <img
        className="w-full h-60  object-cover"
        src={meetup?.meetup_image || nopicture}
        alt=""
      />
      <div className="p-2 py-3 flex flex-col gap-2">
      <span 
         className={`  font-Lora flex items-center gap-2  py-2 text-center text-sm`}>
        <span className={`${meetup?.cancelled ? 'bg-red-600/90': 'bg-green-600/90'} w-3 h-3 rounded-full`}></span>
         Meetup {isOutDated? 'Terminado' : meetup?.cancelled ? 'Cancelado' : 'Activo'}
          </span>
        <h1 className="font-Lora text-lg font-semibold">
          {meetup?.meetup_title}
        </h1>
        <p className="font-Lora ">{meetup?.meetup_description}</p>
        <div className=" py-2 flex flex-col gap-3">
      
       
          <p className="font-Lora font-lg font-semibold">Cuando?</p>
          <p className=" flex  font-semibold gap-2 text-sm">
            {HandleDate(meetup?.meetup_datetime)}
          </p>
          <p className="font-Lora font-lg font-semibold">Temática</p>
          <p className="font-Lora">{meetup?.meetup_theme}</p>
        </div>
        <p className="font-Lora font-lg font-semibold">Donde?</p>
        <div className="w-full h-52 max-w-lg">
          {isLoaded && (
            <GoogleMap
              mapContainerStyle={{ height: "100%", width: "100%" }}
              options={{ controlSize: 25 }}
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
          className="shadow-xl border my-5 w-full max-w-lg rounded-md"
        >
          <button className="border text-sm font-semibold w-full  border-blue-600/50 rounded-md text-zinc-50 shadow-md bg-blue-500 px-2 py-2 ">
            Abrir en Google Maps
          </button>
        </a>
        <div
          className="flex w-full flex-col items-start justify-start gap-1 p-2 cursor-pointer font-semibold text-md font-Lora"
          onClick={(e) => {
            e.stopPropagation();
            navigate(`/user/details/${meetup?.id_main_user}`);
          }}
        >
          <div className="flex items-center justify-between w-full">
            <p>Meetup publicado por </p>
            <div className="flex items-center justify-start gap-2 border pr-3 rounded-full shadow-md">
              <img
                className="w-10 h-10 object-cover rounded-full drop-shadow-md"
                src={meetup?.picture_url || nouserpicure}
                alt="user picture"
              />
              <p className="font-sans text-sm">{meetup?.user_name}</p>
            </div>
          </div>
        </div>
        <div className="flex flex-col justify-start items-start py-3  px-2">
          <p className="flex items-center justify-start gap-2 font-semibold">
            {meetup?.assistants?.length ? meetup.assistants.length : "0"}{" "}
            personas{" "}
            {meetup?.assistants?.length
              ? meetup.assistants.length === 0 || meetup.assistants.length > 1
                ? "parteciparán"
                : "participará"
              : "partciparán"}
          </p>
          <div className="w-full flex flex-wrap gap-2 mt-2">
            {meetup?.assistants?.length &&
              meetup?.assistants.map((item) => (
                <span
                  key={item.id_user}
                  className="h-10  flex items-center justify-start gap-1 border rounded-full  shadow-md pr-3"
                >
                  <img
                    className="w-8 h-8 rounded-full object-cover "
                    src={item.picture_url}
                    alt="user image"
                  />
                  <span className="font-medium text-sm">{item.user_name}</span>
                </span>
              ))}
          </div>
        </div>
        <div className="my-4 w-full max-w-lg shadow-lg flex flex-col gap-1">
          <button
            onClick={HandleJoin}
            disabled={JoinLoading || isOutDated || meetup?.cancelled}
            className={`text-sm w-full flex items-center justify-center gap-2 text-center px-2 py-2.5 text-md font-semibold rounded-lg transition-all text-white ${
              userJoined
                ? "bg-amber-500  hover:bg-amber-600"
                : "bg-indigo-500  hover:bg-indigo-800"
            }  focus:ring-4 focus:outline-none focus:ring-blue-300 `}
          >
            {userJoined ? "Ya no quiero ir" : "Me apunto!"}{" "}
            {JoinLoading && <div className="lds-dual-ring"></div>}
          </button>
          <button
            onClick={HandleDelete}
            disabled={(meetup?.id_main_user !== user?.id) || (isOutDated || meetup?.cancelled)}
            className={`${
              meetup?.id_main_user !== user?.id ? "hidden" : "flex "
            } text-sm w-full items-center justify-center gap-2 text-center px-2 py-2.5 text-md font-semibold rounded-lg transition-all text-white bg-red-600 focus:ring-4 focus:outline-none focus:ring-red-700 `}
          >
            {}Cancelar Meetup
          </button>
        </div>
      </div>
    </div>
  );
};

export default MeetupDetails;
