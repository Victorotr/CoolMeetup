import { useState, useEffect } from "react";
import { Handler } from "../context/Context";

const CookieAdvice = () => {
  const [show, setshow] = useState(true);
  const { user } = Handler();
  useEffect(() => {
    if (user) {
      setshow(false);
    }
  }, [user]);

  return (
    <div
      className={`${
        show ? "fixed" : "hidden"
      } font-medium bottom-20 text-sm z-50 left-2 md:left-10 xl:left-52  bg-zinc-50 border border-zinc-900/20 shadow-lg rounded-full pr-5  `}
    >
      <div className="flex items-center gap-2  relative">
        <img
          className="absolute w-20  rounded-full"
          src="/src/assets/cookie.png"
          alt="cookie"
        />
        <div className="flex items-center  gap-2 py-1 md:py-3 pl-24">
          {" "}
          <p className="text-sm">
            Esta página utiliza cookies propias y de terceros.
          </p>
          <div className="flex gap-3 items-center justify-between">
            <a className="underline" href="/cookiesPolicy">
              Política de cookies
            </a>
            <button
              onClick={() => setshow(false)}
              className="border  rounded-md px-2 py-1.5 font-medium text-zinc-50 bg-indigo-500"
            >
              Aceptar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CookieAdvice;
