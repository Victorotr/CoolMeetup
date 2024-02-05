import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import HandleDate from "../functions/HandleDate";
import { FaUsers } from "react-icons/fa";
import { FaPersonWalkingArrowRight, FaArrowRight } from "react-icons/fa6";

const MeetupCardMin = ({ meetup }) => {
  const navigate = useNavigate();
  const [isOutDated, setisOutDated] = useState(false);
  
  useEffect(() => {
    const now = new Date()
    const meetupDate = new Date(meetup.meetup_datetime);
    if(now > meetupDate){
      setisOutDated(true)
    }

  }, [])
  
  return (
    <div
      onClick={() => navigate("/meetups/details/" + meetup.id_meetup)}
      className="flex relative max-w-md sm:max-w-sm w-full flex-col border border-zinc-900/10 rounded-md overflow-hidden justify-between shadow-md hover:scale-105 transition-all "
    >
       <span className={`${ meetup?.cancelled  ? 'flex' : isOutDated ? 'flex' : 'hidden'}  bg-zinc-500/10 z-40 absolute top-0 left-0 w-full h-full items-start py-14 justify-center`}>
       <p className="text-zinc-50 text-shadow font-bold text-xl text-center font-Lora bg-red-600/70 shadow-md p-3 rounded-md ">MEETUP <br /> FINALIZADO O CANCELADO</p>
        </span>
      
      
      <span className="absolute top-2 right-2 shadow-md font-semibold text-xs bg-zinc-50 rounded-full px-2 py-0.5">
        {meetup.meetup_theme}
      </span>
      <img
        className={`${meetup.meetup_image ? 'object-cover' : 'object-contain opacity-70'} max-h-52 w-full  hover:scale-105 transition-all`}
        src={meetup.meetup_image || "/src/assets/no_meetup_image.png"}
        alt="meetup image"
      />

      <div className="p-1 ">
        <div className="p-2  w-full flex flex-col justify-between">
          <div className="max-h-32 overflow-hidden">
            <h4 className="mb-2 font-bold tracking-tight text-gray-900 dark:text-white">
              {meetup.meetup_title}
            </h4>

            <p className=" overflow-ellipsis relative max-h-10 font-normal text-gray-700 dark:text-gray-400">
              {meetup.meetup_description}
              <span className="absolute top-0 left-0 w-full h-full  bg-gradient-to-b from-transparent via-transparent to-white/70"></span>
            </p>
          </div>

       
        </div>
        <div className="px-2 py-2">
          <p className=" flex  font-medium gap-7">
            {HandleDate(meetup.meetup_datetime)}
          </p>
        </div>

        <div className="flex justify-between items-center px-2 border-t  py-1">
          <span className="">
            {meetup.assistants === 0 ? (
              <span className="border rounded-full px-3 py-1.5 text-sm text-zinc-800/90 shadow-md bg-green-500/70 font-medium">
                Sé el primero en asistir!
              </span>
            ) : (
              <span className="font-semibold text-zinc-900/90 flex items-center gap-1">
                <FaUsers />
                {meetup.assistants}{" "}
                {`Asistirá` + (meetup.assistants > 1 ? "n" : "")}
              </span>
            )}
          </span>
          <div
            className=" px-1 py-0 cursor-pointer h-10  flex items-center justify-start gap-1 border rounded-full  shadow-md pr-3"
            onClick={(e) => {
              e.stopPropagation();
              navigate(`/user/details/${meetup.main_user_details.user_id}`);
            }}
          >
            <img
              className="w-8 h-8 rounded-full object-cover "
              src={
                meetup.main_user_details.avatar || "/src/assets/no_picture.png"
              }
              alt="user picture"
            />
            <p className="font-medium text-sm">
              {meetup.main_user_details.username}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MeetupCardMin;
