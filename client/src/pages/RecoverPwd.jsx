// Imports

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Handler } from "../context/Context";

// Llamada a la API para envío de recovercode al email

const RecoverPwdinstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
});

const RecoverPwd = () => {
  const navigate = useNavigate();
  const { settoast } = Handler();
  const [email, setEmail] = useState("");

  const handleRecoverPwd = async (e) => {
    e.preventDefault();
    try {
      const res = await RecoverPwdinstance.post("/recoverpwd", {
        email: email,
      });
      console.log(res);
      if (res && res.status === 200) {
        navigate("/resetpwd");
      } else {
        settoast({
          on: true,
          type: "warning",
          text: res.data.message,
        });
      }
    } catch (error) {
      if (error && error.response.data.message) {
        settoast({
          on: true,
          type: "error",
          text: error.response.data.message,
        });
      } else {
        settoast({
          on: true,
          type: "error",
          text: "Problemas con el servidor, por favor intentelo más tarde",
        });
      }
    }
  };

  return (
    <section className="bg-zinc-50">
      <div className="flex flex-col items-center justify-center px-6 py-32">
        <div className="w-full bg-zinc-50 border rounded-lg  md:mt-0 sm:max-w-md xl:p-0 shadow-md">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
              Recupera tu contraseña
            </h1>
            <form
              className="space-y-4 md:space-y-6"
              onSubmit={handleRecoverPwd}
            >
              <div>
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-gray-900 "
                >
                  Introduce tu email
                </label>
                <input
                  type="text"
                  name="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg  focus:border-primary-600 block w-full p-2.5  "
                  placeholder="ejemplo@mail.com"
                />
              </div>
              <button
                type="submit"
                className="w-full border border-blue-900 bg-blue-600/90 focus:ring-4 shadow focus:outline-none  font-medium rounded-lg text-sm px-5 py-2.5 text-center text-white"
              >
                Enviar
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RecoverPwd;
