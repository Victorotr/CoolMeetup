import axios from "axios";
export const LogOut = async () => {

  console.log(import.meta.env.VITE_API_URL);
  //it doesnt work if the url in the browser is localhost:5173 configure an .env.local with VITE_API_URL=youripaddress:3000
  const res = await axios.get(`${import.meta.env.VITE_API_URL}/logout`, {
    withCredentials: true,
  });
  return res;
  
};
