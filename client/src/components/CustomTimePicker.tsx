/* eslint-disable react/prop-types */
import React,{ useState, useEffect, useRef, FC } from "react";
import { CiTimer } from "react-icons/ci";

interface Time {
  hours: string;
  minutes: string;
}

interface Props {
  timeSelected: (time: Time) => void;
  onChange:(time:Time)=>void;
}

const CustomTimePicker: FC<Props> = ({ timeSelected,onChange }) => {
  const [time, settime] = useState<Time>({ hours: "", minutes: "" });
  const [hours, sethours] = useState<string[]>([]);
  const [minutes, setminutes] = useState<string[]>([]);
  const [pickOn, setpickOn] = useState<boolean>(false);
  const now = new Date();
  const timePickerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const hoursArray: string[] = [];
    const minutesArray: string[] = ["00", "15", "30", "45"];
    for (let i = 0; i < 24; i++) {
      hoursArray.push(i < 10 ? `0${i}` : `${i}`);
    }
    sethours(hoursArray);
    setminutes(minutesArray);
    settime({ hours: String(now.getHours() + 1), minutes: "00" });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        timePickerRef.current &&
        !timePickerRef.current.contains(event.target as Node)
      ) {
        // Clic fuera del componente, perder foco
        setpickOn(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    timeSelected(time);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [time]);

  return (
    <div
      onClick={() => setpickOn(true)}
      
      ref={timePickerRef}
      className={`${
        pickOn && "border-2 border-b border-zinc-900"
      } px-3 shadow-md border min-w-32 rounded-md h-10 flex items-center justify-start gap-1 relative z-50 `}
    >
      <CiTimer strokeWidth={1} className="text-zinc-900/70" />
      {time.hours}:{time.minutes}
      <div
        className={`${
          pickOn ? "h-52" : "h-0 w-0 bg-transparent border-none"
        } absolute top-9 left-0 shadow-md bg-zinc-50 w-full transition-all border rounded-b-md flex justify-center`}
      >
        <div className="w-1/2 flex flex-col max-h-52 overflow-y-scroll no-scrollbar">
          {hours?.map((item, i) => {
            return (
              <button
                className={`${
                  time.hours === item && "bg-blue-500"
                } flex  items-center rounded-sm justify-center hover:bg-blue-500 border p-1 disabled:text-zinc-900/30 disabled:hover:bg-zinc-200`}
                key={i}
                value={item}
                onClick={(e) => {
                  e.preventDefault();
                  settime({ ...time, hours: item });
                  onChange()
                }}
              >
                {item}
              </button>
            );
          })}
        </div>
        <div className="w-1/2 flex flex-col  max-h-52 overflow-y-scroll no-scrollbar">
          {minutes?.map((item, i) => {
            return (
              <button
                className={`${
                  time.minutes === item && "bg-blue-500"
                } flex items-center rounded-sm justify-center hover:bg-blue-500 border p-1`}
                key={i}
                value={item}
                onClick={(e) => {
                  e.preventDefault();
                  settime({ ...time, minutes: item });
                  onChange()
                }}
              >
                {item}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default CustomTimePicker;
