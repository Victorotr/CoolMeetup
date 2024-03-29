// MyContext.js
import { createContext, useContext, useState, useEffect } from "react";
import { HandleVisit } from "../functions/SetVisit";
import axios from "axios";
import { io } from "socket.io-client";
import { LogOut } from "../functions/LogOut";
const LoggedInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
});

export const MyContext = createContext();

export const Handler = () => {
  const context = useContext(MyContext);

  if (!context) {
    throw new Error("Handler must be used within a TaskContextProvider ");
  }
  return context;
};
// eslint-disable-next-line react/prop-types
export const MyContextProvider = ({ children }) => {
  const [myData, setMyData] = useState("inital Data");
  const [menuOn, setmenuOn] = useState(false);
  const [toast, settoast] = useState({ on: false, type: "", text: "" });
  const [user, setuser] = useState(null);
  const [accessLoading, setaccessLoading] = useState(true);
  const [userLocation, setuserLocation] = useState(null);
  const [loading, setloading] = useState(false);
  const [socket, setsocket] = useState(null);
  const [keepOpen, setkeepOpen] = useState(true);
  useEffect(() => {
    const isLogged = async () => {
      const timeout = setTimeout(() => {
        setuser(null);
        settoast({
          on: true,
          type: "warning",
          text: "No ha sido posible conectarse al servidor...",
        });
        setaccessLoading(false);
      }, 5000);
      const res = await LoggedInstance.get("/islogged");

      if (res && res.data.user) {
        setuser(res.data.user);
      } else {
        setuser(null);
      }
      setaccessLoading(false);
      clearTimeout(timeout);
    };
    isLogged();
  }, []);

  // Get geolocation
  useEffect(() => {
    const success = (position) => {
      const { latitude, longitude } = position.coords;
   
      setuserLocation({ lat: latitude, lng: longitude });
    };

    const error = (err) => {
      console.error(`Error getting geolocation: ${err.message}`);
    };

    navigator.geolocation.getCurrentPosition(success, error);
  }, []);

  useEffect(() => {
    const handleUnload = async () => {
      await HandleVisit();
      if(!keepOpen){
      LogOut()
      }
    };
    window.addEventListener("beforeunload", handleUnload);
    return () => {
      window.removeEventListener("beforeunload", handleUnload);
    };
  }, [keepOpen]);

  
  useEffect(() => {
    if (user && user.id) {
      const socketConn = io(import.meta.env.VITE_API_URL, {
        withCredentials: true,
      });
      socketConn?.emit("user_id", user.id || null);
      if (socketConn) {
        setsocket(socketConn);
      }

      socket?.on("disconnect", () => {
        console.log("Desconectado del servidor de Socket.io");
      });
      return () => {
        if (socket) socket.disconnect();
      };
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  return (
    <MyContext.Provider
      value={{
        myData,
        setMyData,
        menuOn,
        setmenuOn,
        toast,
        settoast,
        user,
        setuser,
        accessLoading,
        userLocation,
        socket,
        loading,
        setloading,
        setkeepOpen,
      }}
    >
      {children}
    </MyContext.Provider>
  );
};
