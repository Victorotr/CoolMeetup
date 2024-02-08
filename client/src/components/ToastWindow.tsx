import { Handler } from "../context/Context";
import { MdOutlineClose } from "react-icons/md";
import { useState, useEffect } from "react";
import { MdWarning, MdError } from "react-icons/md";
import { IoMdCheckmark } from "react-icons/io";
import React,{ FC } from "react";

const ToastWindow: FC = () => {
  const { toast, settoast } = Handler();
  const [toastType, settoastType] = useState<"success" | "warning" | "error">("success");

  useEffect(() => {
    const timer = setTimeout(() => {
      if (toast.on) {
        settoast({ ...toast, on: false });
      }
    }, 6000);

    return () => clearTimeout(timer);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [toast]);

  useEffect(() => {
    if (toast.type === "warning") {
      settoastType("warning");
    } else if (toast.type === "error") {
      settoastType("error");
    } else {
      settoastType("success");
    }
  }, [toast.type]);

  return (
    <div
      className={`${
        toast.text ? "flex" : "hidden"
      } ${toast.on ? "slidedown" : "slideup"} ${
        toast.type
      } ${toastType === 'warning' ? 'border-amber-600/50' : toastType === 'error' ? 'border-red-500/50' : 'border-blue-500/50'} text-sm items-center justify-between gap-2 z-50 fixed p-2 rounded-md shadow-xl top-12 w-96 bg-zinc-50 left-0 right-0 mx-auto border-l-8`}
    >
      <span className="my-auto">
        {toastType === 'warning' ? <MdWarning size={30} color="orange" /> : toastType === 'error' ? <MdError size={30} color="red" /> : <IoMdCheckmark size={30} />}
      </span>
      <p className="text-zinc-900/80 font-medium">{toast.text}</p>
      <span
        onClick={() => {
          settoast({ ...toast, on: false });
        }}
        className="  h-full rounded-sm cursor-pointer"
      >
        {" "}
        <MdOutlineClose className="text-zinc-900/80" size={25} />
      </span>
    </div>
  );
};

export default ToastWindow;
