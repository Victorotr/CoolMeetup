import { Handler } from "../context/Context";
import { MdOutlineClose } from "react-icons/md";
import { useState, useEffect } from "react";
import { MdWarning, MdError } from "react-icons/md";
import { IoMdCheckmark } from "react-icons/io";

const ToastWindow = () => {
  const { toast, settoast } = Handler();
  const [toastType, settoastType] = useState("success");

  useEffect(() => {
    if (toast.type === "warning") {
      settoastType("warning");
      return;
    } else if (toast.type === "error") {
      settoastType("error");
      return;
    }
    settoastType("success");
  }, [toast]);

  return (
    <div
      className={`${toast.text ? "flex" : "hidden"} ${
        toast.on ? "slidedown" : "slideup"
      } ${
        toast.type
      }  ${toastType === 'warning' ? 'border-amber-600/50' : toastType === 'error' ? 'border-red-500/50' : 'border-blue-500/50' } items-center justify-between gap-2 z-50 absolute p-2 rounded-md shadow-xl top-16 w-96 bg-zinc-50 left-0 right-0 mx-auto border-2 `}
    >
      <span className="my-auto">
      {toastType === 'warning' ? <MdWarning size={35} color="orange"/> : toastType === 'error' ? <MdError size={35} color="red" /> : <IoMdCheckmark size={35} />}  
      </span>
      <p className="text-zinc-900/80 font-medium">{toast.text}</p>
      <span
        onClick={() => {
          settoast({ ...toast, on: false });
        }}
        className="  h-full rounded-sm"
      >
        {" "}
        <MdOutlineClose className="text-zinc-900/90" size={30} />
      </span>
    </div>
  );
};

export default ToastWindow;
