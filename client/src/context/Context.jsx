// MyContext.js
import { createContext, useContext, useState, useEffect } from "react";
import { HandleVisit } from "../functions/SetVisit";
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
  const [toast, settoast] = useState({on:false,type:'',text:''});
  const [user, setuser] = useState(null);

  useEffect(() => {
    const handleUnload = async () => {
      await HandleVisit();
      
    };
    window.addEventListener("beforeunload", handleUnload);
    return () => {
    window.removeEventListener("beforeunload", handleUnload);
    };
  }, []);
  return (
    <MyContext.Provider value={{ myData, setMyData, menuOn, setmenuOn,toast,settoast,user,setuser}}>
      {children}
    </MyContext.Provider>
  );
};
