import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import HandleDate from "../functions/HandleDate";
import { FaUsers } from "react-icons/fa";
import { FaPersonWalkingArrowRight, FaArrowRight } from "react-icons/fa6";

const MeetupCard = ({ meetup }) => {
  const navigate = useNavigate();
  const [isOutDated, setisOutDated] = useState(false);

  return (
    <div
      onClick={() => navigate("/meetups/details/" + meetup.id_meetup)}
      className="flex relative max-w-md w-full flex-col border border-zinc-900/30 rounded-md overflow-hidden justify-between shadow-md hover:scale-105 transition-all "
    >
      <div
        className={`${
          !isOutDated ? "hidden" : "flex"
        } absolute  bg-zinc-50/30 top-0 left-0 w-full h-full z-50`}
      ></div>
      <span className="absolute top-2 right-2 border shadow-md font-semibold text-xs bg-zinc-50 rounded-full px-2 py-0.5">
        {meetup.meetup_theme}
      </span>
      <img
        className=" max-h-60 w-full object-cover"
        src={meetup.meetup_image || "/src/assets/no_meetup_image.png"}
        alt="meetup image"
      />

      <div className="p-1 ">
        <div className="p-2 h-40  w-full flex flex-col justify-between">
          <div className="max-h-32 overflow-hidden">
            <h4 className="mb-2 font-bold tracking-tight text-gray-900 dark:text-white">
              {meetup.meetup_title}
            </h4>

            <p className=" overflow-ellipsis relative h-16 font-normal text-gray-700 dark:text-gray-400">
              {meetup.meetup_description}
              <span className="absolute top-0 left-0 w-full h-full  bg-gradient-to-b from-transparent via-transparent to-white/70"></span>
            </p>
          </div>

          <div className="flex gap-2 ">
            <a
              href={`/meetups/details/${meetup.id_meetup}`}
              className="inline-flex shadow-md items-center gap-2 px-3 py-1.5 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Más detalles
              <span>
                <FaArrowRight />
              </span>
            </a>
            <a
              href={`#`}
              className="inline-flex gap-2 sahdow-md float-right items-center px-3 py-1.5 text-sm font-medium text-center text-white bg-indigo-600 rounded-lg hover:bg-indigo-800 focus:ring-4 focus:outline-none focus:ring-blue-300 "
            >
              Me apunto!
              <span>
                <FaPersonWalkingArrowRight />
              </span>{" "}
            </a>
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

export default MeetupCard;
