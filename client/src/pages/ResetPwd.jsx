// Imports

import axios from "axios";
import { Handler } from "../context/Context";
import { useNavigate } from "react-router";
import { useState } from "react";

// Llamada a la API para envío de recovercode al email

const ResetPwd = () => {
  const ResetPwdIstance = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    withCredentials: true,
  });

  const { settoast } = Handler();
  const navigate = useNavigate();
  const [recoverCode, setRecoverCode] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [newPassword0, setNewPassword0] = useState("");

  const submitForm = async (e) => {
    e.preventDefault();
    try {
      const res = await ResetPwdIstance.post("/resetpwd", {
        recoverCode: recoverCode,
        newPassword: newPassword,
      });

      if (res && newPassword === newPassword0) {
        settoast({ on: true, type: "success", text: res.data.message });
        navigate("/signin");
      } else {
        settoast({
          on: true,
          type: "warning",
          text: "Las contraseñas no coinciden",
        });
      }
    } catch (error) {
      console.error(error);
      settoast({
        on: true,
        type: "success",
        text: error.response.data.message,
      });
    }
  };
  return (
    <section className="bg-zinc-50">
      <div className="flex flex-col items-center justify-center px-6 py-32">
        <div className="w-full bg-zinc-50 border rounded-lg  md:mt-0 sm:max-w-md xl:p-0 shadow-md">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
              Crea tu nueva contraseña
            </h1>
            <form className="space-y-4 md:space-y-6" onSubmit={submitForm}>
              <div>
                <label
                  htmlFor="recover_code"
                  className="block mb-2 text-sm font-medium text-gray-900 "
                >
                  Introduce el código de recuperación
                </label>
                <input
                  type="text"
                  name="recover_code"
                  id="recover_code"
                  value={recoverCode}
                  onChange={(e) => setRecoverCode(e.target.value)}
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg  focus:border-primary-600 block w-full p-2.5  "
                  placeholder="Código"
                  required="required"
                />
              </div>
              <div>
                <label
                  htmlFor="new_password0"
                  className="block mb-2 text-sm font-medium text-gray-900 "
                >
                  Introduce tu nueva contraseña
                </label>
                <input
                  type="password"
                  name="new_password0"
                  id="new_password0"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg  focus:border-primary-600 block w-full p-2.5  "
                  placeholder="Nueva contraseña"
                  required="required"
                />
              </div>
              <div>
                <label
                  htmlFor="new_password1"
                  className="block mb-2 text-sm font-medium text-gray-900 "
                >
                  Repite la nueva contraseña
                </label>
                <input
                  type="password"
                  name="new_password1"
                  id="new_password1"
                  value={newPassword0}
                  onChange={(e) => setNewPassword0(e.target.value)}
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg  focus:border-primary-600 block w-full p-2.5  "
                  placeholder="Repetir contraseña"
                  required="required"
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

export default ResetPwd;
