import { Handler } from "../context/Context";

import React,{ FC } from "react";
const Loading: FC = () => {
  const { accessLoading } = Handler();

  return (
    <div className={`${!accessLoading ? 'hidden':'flex'} z-50 w-screen min-h-screen h-screen flex flex-col items-center justify-center border absolute top-0 left-0 bg-zinc-50/80`}>
      <p className="my-5 text-xl font-semibold">Cargando...</p>
      <svg className="pl" width="240" height="240" viewBox="0 0 240 240">
        <circle
          className="pl__ring pl__ring--a"
          cx="120"
          cy="120"
          r="105"
          fill="none"
          stroke="#000"
          strokeWidth="20"
          strokeDasharray="0 660"
          strokeDashoffset="-330"
          strokeLinecap="round"
        ></circle>
        <circle
          className="pl__ring pl__ring--b"
          cx="120"
          cy="120"
          r="35"
          fill="none"
          stroke="#000"
          strokeWidth="20"
          strokeDasharray="0 220"
          strokeDashoffset="-110"
          strokeLinecap="round"
        ></circle>
        <circle
          className="pl__ring pl__ring--c"
          cx="85"
          cy="120"
          r="70"
          fill="none"
          stroke="#000"
          strokeWidth="20"
          strokeDasharray="0 440"
          strokeLinecap="round"
        ></circle>
        <circle
          className="pl__ring pl__ring--d"
          cx="155"
          cy="120"
          r="70"
          fill="none"
          stroke="#000"
          strokeWidth="20"
          strokeDasharray="0 440"
          strokeLinecap="round"
        ></circle>
      </svg>
    </div>
  );
};

export default Loading;