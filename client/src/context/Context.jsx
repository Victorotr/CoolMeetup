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
  const [accessLoading, setaccessLoading] = useState(true)

  useEffect(() => {
    const isLogged = async ()=>{
     const timeout =  setTimeout(() => {
        setuser(null);
        settoast({on:true,type:'warning',text:'No ha sido posible conectarse al servidor...'});
        setaccessLoading(false)
      }, 5000);
      const res = await LoggedInstance.get('/islogged');
      
      if(res && res.data.user){
    
        setuser(res.data.user); 
      }else{
        setuser(null)
      }
      setaccessLoading(false)
      clearTimeout(timeout)
    }
    isLogged();
    
  }, [])
 
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
    <MyContext.Provider value={{ myData, setMyData, menuOn, setmenuOn,toast,settoast,user,setuser,accessLoading}}>
      {children}
    </MyContext.Provider>
  );
};
