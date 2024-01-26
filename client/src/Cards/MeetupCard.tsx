import React from "react";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import { CiClock1, CiCalendar } from "react-icons/ci";
import { FaArrowRight } from "react-icons/fa";
import nopicture from "../assets/no_meetup_image.png";
import nouserpicure from "../assets/no_picture.png";
const MeetupCard = ({ meetup }) => {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate("/meetups/details/" + meetup.id_meetup)}
      className="flex max-w-sm w-full flex-col border border-zinc-900/40 rounded-md overflow-hidden justify-between shadow-md hover:scale-105 transition-all "
    >
      <img
        className=" max-h-60 object-cover"
        src={meetup.meetup_image || nopicture}
        alt=""
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
        <div className="flex gap-2">
          <a
            href={`/meetup/details/${meetup.id_meetup}`}
            className="inline-flex items-center gap-2 px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Más detalles
          </a>
          <a
            href={`#`}
            className="inline-flex float-right items-center px-3 py-2 text-sm font-medium text-center text-white bg-amber-500 rounded-lg hover:bg-orange-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Me apunto!
          </a>
        </div>
      </div>
      <div className="px-2 py-2">
        <p className=" flex  font-medium gap-7">
          <span className="flex items-center gap-1">
            <CiCalendar className="text-zinc-900/80" style={{strokeWidth:'1.5px'}}  /> {moment(meetup.meetup_datetime).format("DD/MM/YY")}
          </span>
          <span className="flex items-center gap-1">
            <CiClock1 className="text-zinc-900/80" style={{strokeWidth:'1.5px'}} />
            {moment(meetup.meetup_datetime, "HH:mm:ss").format("HH:mm")}
          </span>
        </p>
      </div>

      <div className="flex justify-between items-center px-2">
        <span className="">
          {meetup.meetup_attendees === null ? (
            <span className="border rounded-full px-2 py-1 shadow-md bg-green-500/50 font-medium">
              Sé el primero en asistir!
            </span>
          ) : (
            <span>
              {meetup.meetup_attendees}{" "}
              {`Asistirá` + (meetup.meetup_attendees > 1 ? "n" : "")}
            </span>
          )}
        </span>
        <div
          className="flex items-center justify-end gap-1 p-2 cursor-pointer"
          onClick={(e) => {
            e.stopPropagation();
            navigate(`/user/details/${meetup.id_main_user}`);
          }}
        >
          <img
            className="w-7 h-7 object-cover rounded-full"
            src={meetup.picture_url || nouserpicure}
            alt="user picture"
          />
          <p className="font-medium text-md">{meetup.user_name}</p>
        </div>
      </div>
      </div>
    </div>
  );
};

export default MeetupCard;
