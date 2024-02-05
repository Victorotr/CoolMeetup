
import { Instance } from "../axios/Instance";
export const LogOut = async () => {

  
  //it doesnt work if the url in the browser is localhost:5173 configure an .env.local with VITE_API_URL=youripaddress:3000
  const res = await Instance.get(`/logout`, {
    withCredentials: true,
  });
  
  return res;
  
};
