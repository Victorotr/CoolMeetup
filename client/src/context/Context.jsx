// MyContext.js
import { createContext, useContext, useState } from "react";

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

  return (
    <MyContext.Provider value={{ myData, setMyData ,menuOn,setmenuOn}}>
      {children}
    </MyContext.Provider>
  );
};
