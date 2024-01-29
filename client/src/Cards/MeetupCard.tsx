import React from "react";
import { useNavigate } from "react-router-dom";
import HandleDate from "../functions/HandleDate";
import { FaUsers } from "react-icons/fa";

const MeetupCard = ({ meetup }) => {
  const navigate = useNavigate();

 
  return (
    <div
      onClick={() => navigate("/meetups/details/" + meetup.id_meetup)}
      className="flex max-w-sm w-full flex-col border border-zinc-900/10 rounded-md overflow-hidden justify-between shadow-md hover:scale-105 transition-all "
    >
      <img
        className=" max-h-60 object-cover"
        src={meetup.meetup_image ||  '/src/assets/no_meetup_image.png'}
        alt="meetup image"
      />
      <div className="p-1 ">
      <div className="p-2 h-40  w-full flex flex-col justify-between">
        <div className="max-h-32 overflow-hidden">
          <h4 className="mb-2 font-bold tracking-tight text-gray-900 dark:text-white">
            {meetup.meetup_title}
          </h4>

          <p className="  overflow-ellipsis h-16 font-normal text-gray-700 dark:text-gray-400">
            {meetup.meetup_description}
          </p>
        </div>
        <div className="flex gap-2 ">    Más detalles
          <a
            href={`/meetups/details/${meetup.id_meetup}`}
            className="inline-flex items-center gap-2 px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
        
          </a>
          <a
            href={`#`}
            className="inline-flex float-right items-center px-3 py-2 text-sm font-medium text-center text-white bg-indigo-500 rounded-lg hover:bg-indigo-800 focus:ring-4 focus:outline-none focus:ring-blue-300 "
          >
            Me apunto!
          </a>
        </div>
      </div>
      <div className="px-2 py-2">
        <p className=" flex  font-medium gap-7">
            {HandleDate(meetup.meetup_datetime)}
        </p>
      </div>

      <div className="flex justify-between items-center px-2">
        <span className="">
          {meetup.assistants === 0 ? (
            <span className="border rounded-full px-3 py-1.5 text-sm text-zinc-800/90 shadow-md bg-green-500/70 font-medium">
              Sé el primero en asistir!
            </span>
          ) : (
            <span className="font-semibold flex items-center gap-1">
              <FaUsers/>
              {meetup.assistants}{" "}
              {`Asistirá` + (meetup.assistants > 1 ? "n" : "")}
            </span>
          )}
        </span>
        <div
          className="flex items-center justify-end gap-1 p-2 cursor-pointer"
          onClick={(e) => {
            e.stopPropagation();
            navigate(`/user/details/${meetup.main_user_details.user_id}`);
          }}
        >
          <img
            className="w-7 h-7 object-cover rounded-full"
            src={meetup.main_user_details.avatar || '/src/assets/no_picture.png'}
            alt="user picture"
          />
          <p className="font-medium text-md">{meetup.main_user_details.username}</p>
        </div>
      </div>
      </div>
    </div>
  );
};

export default MeetupCard;
