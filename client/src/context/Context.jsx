// MyContext.js
import { createContext, useContext, useState, useEffect } from "react";
import { HandleVisit } from "../functions/SetVisit";
import axios from "axios";

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
  const [toast, settoast] = useState({on:false,type:'',text:''});
  const [user, setuser] = useState(null);

  useEffect(() => {
    const isLogged = async ()=>{
      const res = await LoggedInstance.get('/islogged');
      console.log(res);
      if(res && res.data.user){
        setuser(res.data.user);
      }else{
        setuser(null)
        console.log(res)
      }
    }
    isLogged();
  }, [])
  useEffect(() => {
   console.log(user)
  }, [user])
  
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
