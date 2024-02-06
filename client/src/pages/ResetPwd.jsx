// Imports

import axios from "axios";
import { Handler } from "../context/Context";
import { useNavigate } from "react-router";

// Llamada a la API para envío de recovercode al email

const ResetPwd = () => {
  const ResetPwdIstance = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    withCredentials: true,
  });

  const { settoast } = Handler();
  const navigate = useNavigate();

  const submitForm = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const form_values = Object.fromEntries(formData);
    try {
      const res = await ResetPwdIstance.post("/recoverpwd", {
        recoverCode: form_values.recoverCode,
        newPassword: newPassword,
      });
      console.log(res);
      settoast({ on: true, type: "success", text: res.data.message });
      navigate("/signin");
    } catch (error) {
      console.log(error);
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
                  htmlFor="nombre_usuario"
                  className="block mb-2 text-sm font-medium text-gray-900 "
                >
                  Introduce el código de recuperación
                </label>
                <input
                  type="text"
                  name="recover_code"
                  id="recover_code"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg  focus:border-primary-600 block w-full p-2.5  "
                  placeholder="Código"
                  required="required"
                />
              </div>
              <div>
                <label
                  htmlFor="nombre_usuario"
                  className="block mb-2 text-sm font-medium text-gray-900 "
                >
                  Introduce tu nueva contraseña
                </label>
                <input
                  type="password"
                  name="recover_code"
                  id="recover_code"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg  focus:border-primary-600 block w-full p-2.5  "
                  placeholder="Nueva contraseña"
                  required="required"
                />
              </div>
              <div>
                <label
                  htmlFor="nombre_usuario"
                  className="block mb-2 text-sm font-medium text-gray-900 "
                >
                  Repite la nueva contraseña
                </label>
                <input
                  type="password"
                  name="recover_code"
                  id="recover_code"
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
