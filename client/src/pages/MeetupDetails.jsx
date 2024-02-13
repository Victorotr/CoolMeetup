import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import nopicture from "../assets/no_meetup_image.png";
import { useNavigate } from "react-router-dom";
import nouserpicure from "../assets/no_picture.png";
import { Handler } from "../context/Context";
import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";
import HandleDate from "../functions/HandleDate";
import HandleDateMin from "../functions/HandleDateMin";
import { Instance } from "../axios/Instance";
import Swal from "sweetalert2";
import { MdShare } from "react-icons/md";
import { IoIosSend } from "react-icons/io";

const MeetupDetails = () => {
  const [JoinLoading, setJoinLoading] = useState(false);
  const { toast, settoast, user, accessLoading, socket } = Handler();
  const { id } = useParams();
  const [meetup, setmeetup] = useState(null);
  const [userJoined, setuserJoined] = useState(false);
  const [isOutDated, setisOutDated] = useState(false);
  const [chatMessages, setchatMessages] = useState([]);
  const [message, setmessage] = useState("");
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
    if (JoinLoading) { return}
    const getDetails = async () => {
      try {
        const res = await Instance.get("/meetup/" + id);
        if (res && res.status === 200) {
          setmeetup(res.data.data);
        } else {
          navigate("/meetup/notfound");
        }
      } catch (error) {
        console.log(error);
        navigate("/meetup/notfound");
      }
    };

    getDetails();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, JoinLoading]);

  const HandleJoin = async () => {
    try {
      if (!meetup && !meetup.id_meetup) {  return;}
      const LeaveMeetup = async () => {
        setJoinLoading(true);
        const res = await Instance.get("/signUp/" + meetup?.id_meetup);
        if (res && res.status === 200 && res.data.message)
          setJoinLoading(false);
      };
      if (userJoined) {
        Swal.fire({
          title: "Estás seguro que quieres desapuntarte?",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          confirmButtonText: "Si! Ya no quiero ir!",
          cancelButtonText: "Cancelar",
        }).then((result) => {
          if (result.isConfirmed) {
            LeaveMeetup();
            Swal.fire({
              title: "Hecho!",
              text: "Te has desapuntado correctamente al evento .",
              icon: "success",
            });
          }
        });
      } else {
        LeaveMeetup();
        Swal.fire({
          title: "Listo!",
          text: "Te has apuntado correctamente al evento!",
          icon: "success",
        });
      }
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
      setJoinLoading(true);
      const res = await Instance.post("/cancel/meetup", {
        meetup_id: meetup.id_meetup,
      });

      if (res && res.status === 200) {
        settoast({
          on: true,
          type: res.data.data.done ? "success" : "warning",
          text: res.data.data.message,
        });
      }
    } catch (error) {
      console.log(error);
    } finally {
      setJoinLoading(false);
    }
  };
  const HandleShare = async () => {
    const link =import.meta.env.VITE_FRONT_URL + "/meetups/details/" + meetup.id_meetup;

    if (!navigator.clipboard) {
      settoast({
        on: true,
        type: "warning",
        text: `Tu navegador no permite copiar automaticamente los links copia la url arriba o este enlace 
        ${link}`,
      });
      return;
    }
    await navigator.clipboard.writeText(link);
    settoast({
      on: true,
      type: "success",
      text: `Enlace copiado`,
    });
  };
  const AddMessage = (data) => {
    setchatMessages((oldMessages) => [...oldMessages, data]);
  };
  useEffect(() => {
    if (!socket || !meetup) {
      console.log("return");
      return;
    }
    const handleData = async (data) => {
      if (data.meetup === meetup.id_meetup) {
        console.log(data);
        AddMessage(data);
      }
    };
    socket.on("messages", (data) => handleData(data));
    return () => {
      socket.off("messages");
    };
  }, [socket, meetup]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!socket) {
      settoast({
        on: true,
        type: "warning",
        message:
          "No ha sido posible connectarse con el chat,intentelo más tarde",
      });
    }
    socket.emit("message", {
      user: user,
      message: message,
      meetup: meetup.id_meetup,
    });
    setmessage("");
  };

  return (
    <div
      className={`${
        isOutDated || meetup?.cancelled ? "opacity-70" : ""
      } w-full max-w-6xl text-md flex flex-col mx-auto py-10 `}
    >
      <div className="flex items-center justify-between mb-5 px-1">
        <h1 className=" text-xl font-semibold">{meetup?.meetup_title}</h1>
        <div className="flex items-center">
          <span
            className={`border px-2 rounded-full text-xs flex items-center gap-2 p-2 text-center  shadow-md`}
          >
            <span
              className={`${
                meetup?.cancelled ? "bg-red-600/90" : "bg-green-600/90"
              } w-3 h-3 rounded-full`}
            ></span>

            {isOutDated
              ? "Terminado"
              : meetup?.cancelled
              ? "Cancelado"
              : "Activo"}
          </span>
          <span
            onClick={HandleShare}
            className="border p-2 rounded-full flex items-center text-xs gap-2 hover:scale-105 shadow-md transition-all"
          >
            <MdShare /> <p>Compartir</p>
          </span>
        </div>
      </div>
      <div className="md:flex md:items-center md:gap-2 items-start md:mb-10">
        <img
          className={`w-full h-72  ${
            meetup?.meetup_image ? "object-cover" : "object-contain"
          }`}
          src={meetup?.meetup_image || nopicture}
          alt="meetup image"
        />

        <div className="md:border md:rounded-md md:shadow-md py-2 px-3  h-full flex flex-col gap-2 min-w-[200px]">
          <p className=" font-semibold">Descripción</p>
          <p className="">{meetup?.meetup_description}</p>
          <div className="flex flex-col gap-3">
            <p className="font-semibold">Cuando?</p>
            <p className="flex font-semibold">
              {HandleDate(meetup?.meetup_datetime)}
            </p>
            <p className=" font-semibold">Temática</p>
            <p className="">{meetup?.meetup_theme}</p>
            <p className=" font-semibold ">Donde?</p>
            <p className=" ">
              {meetup?.meetup_address ? meetup.meetup_address : "Dirección disponible en el mapa"}
            </p>
          </div>
        </div>
      </div>
      <div className="px-2 "></div>
      <div className="w-full h-52 max-w-6xl">
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
        className="shadow-xl border my-5 w-full  rounded-md"
      >
        <button
          disabled={JoinLoading || isOutDated || meetup?.cancelled}
          className="border text-sm font-semibold mx-auto w-full  border-blue-600/50 rounded-md text-zinc-50 shadow-md bg-blue-500 px-2 py-2 "
        >
          Abrir en Google Maps
        </button>
      </a>
      <div
        className="flex w-full flex-col items-start justify-start gap-1 p-2 cursor-pointer font-semibold text-md "
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
      <div className="flex flex-col justify-start items-start py-3 px-2">
        <p className="flex items-center justify-start gap-2 font-semibold">
          {meetup?.assistants?.length ? meetup.assistants.length : "0"} personas{" "}
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
      <div className="my-4 w-full  shadow-lg flex flex-col gap-1">
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
          disabled={
            meetup?.id_main_user !== user?.id || isOutDated || meetup?.cancelled
          }
          className={`${
            meetup?.id_main_user !== user?.id ? "hidden" : "flex "
          } text-sm w-full items-center justify-center gap-2 text-center px-2 py-2.5 text-md font-semibold rounded-lg transition-all text-white bg-red-600 focus:ring-4 focus:outline-none focus:ring-red-700 `}
        >
          {}Cancelar Meetup
        </button>
      </div>

      <p className=" px-2 text-xl mt-5 font-medium text-shadow-soft">
        {meetup?.meetup_title}Chat
      </p>
      <p className="px-2 text-xs mb-5 font-medium text-shadow-soft">
        Utiliza el chat para contactar con los usuarios que participarán o
        quieran saber más sobre este Meetup.
      </p>
      <div className="border  justify-between shadow-inner">
        <div className="scroller">
          <div className="scroller-content  flex flex-col gap-1 px-3">
            {chatMessages.length ? (
              chatMessages.map((item, i) => (
                <div
                  key={i}
                  className={`w-full flex  slideup ${
                    item.user.id === user?.id ? "justify-end" : "justify-start"
                  }`}
                >
                  <span
                    className={`scroller-content ${
                      item.user.id === user?.id
                        ? "bg-gradient-to-b from-slate-100 via-zinc-100 to-indigo-100/20"
                        : "bg-gradient-to-br from-slate-100 via-zinc-50 to-cyan-100/20"
                    }  shadow-md max-w-md p-1 py-2 min-w-[250px] flex flex-col justify-start items-start border rounded-md`}
                  >
                    <span className="flex items-center gap-1 font-medium  rounded-full text-xs text-shadow-soft">
                      <img
                        className="w-6 h-6 rounded-full border"
                        src={item.user.avatar || "/src/assets/no_picture.png"}
                        alt="user-picture"
                      />
                      {item.user.username === user?.username
                        ? "Tú"
                        : item.user.username}{" "}
                      {meetup?.id_main_user === item.user.id
                        ? "(creador de este meetup)"
                        : ""}
                    </span>
                    <span className="px-8">{item.message}</span>
                    <span className="w-full text-xs flex justify-end text-zinc-900/70 text-shadow-soft">
                      {HandleDateMin(item.date)}
                    </span>
                  </span>
                </div>
              ))
            ) : (
              <p className="w-full h-[250px] flex items-center justify-center border text-sm font-medium text-center">
                Tienes alguna duda o quieres proponer algo? <br /> Sé el primero
                en escribir!
              </p>
            )}
          </div>
        </div>

        <div className="w-full flex items-center justify-between my-3">
          <form
            onSubmit={handleSubmit}
            className=" h-10 flex items-center w-full justify-between"
          >
            <div className="border bg-zinc-500/5 shadow-inner rounded-full flex items-center  h-full justify-between px-1 w-full">
              <span className="flex items-center h-full my-1  border rounded-full">
                <img
                  className="w-10 h-10 min-w-10 min-h-10 rounded-full border"
                  src={user?.avatar || "/src/assets/no_picture.png"}
                  alt="user picture"
                />
              </span>
              <input
                onChange={(e) => setmessage(e.target.value)}
                value={message}
                type="text"
                placeholder="Escribe algo aqui..."
                className="w-full bg-transparent h-full px-5 border-none focus:outline-none "
              />
            </div>
            <button type="submit" className="h-full ">
              <span className="rounded-full px-2 h-full gap-1 text-zinc-50 text-xs font-medium flex items-center  border bg-indigo-500">
                <IoIosSend /> Enviar
              </span>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default MeetupDetails;
