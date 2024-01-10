import axios from "axios";
export const HandleVisit = async () => {

  console.log(import.meta.env.VITE_API_URL);
  //it doesnt work if the url in the browser is localhost:5173 configure an .env.local with VITE_API_URL=youripaddress:3000
  const res = await axios.get(`http://${import.meta.env.VITE_API_URL}/visit`, {
    withCredentials: true,
  });
  return res;
  
};
