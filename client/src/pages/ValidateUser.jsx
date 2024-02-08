import { Handler } from "../context/Context";
import { useNavigate } from "react-router";
import { useParams } from "react-router-dom";
import { Instance } from "../axios/Instance";

const ValidateUser = ()=>{
  const { settoast } = Handler();
  const navigate = useNavigate();
  const { regCode } = useParams();
  const submitForm =async(e) => {
    e.preventDefault();

    //lanzar login en la api
    const formData = new FormData(e.target);
    const form_values = Object.fromEntries(formData);
    try {
      const res = await Instance.post(    import.meta.env.VITE_API_URL + "/validateUser",
        {
          regCode: form_values.regCode,
        }
      )
      if(res && res.status === 200){
        settoast({
          on: true,
          type: "success",
          text: "Usuario validado correctamente, ¡Ya puedes acceder a Coolmeetups!",
        });
        navigate("/signin");
      }
    } catch (error) {
      settoast({
        on: true,
        type: "error",
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
              Valida tu registro
            </h1>
            <form className="space-y-4 md:space-y-6" onSubmit={submitForm}>
              <div>
                <label
                  htmlFor="codigo_registro"
                  className="block mb-2 text-sm font-medium text-gray-900 "
                >
                  Código de registro
                </label>
                <input
                  type="text"
                  name="regCode"
                  id="codigo_registro"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg  focus:border-primary-600 block w-full p-2.5  "
                  placeholder="Introduce el código de registro recibido cuando te has registrado"
                  value={regCode}
                  required="required"
                />
              </div>

              <button
                type="submit"
                className="w-full border border-blue-900 bg-blue-600/90 focus:ring-4 shadow focus:outline-none  font-medium rounded-lg text-sm px-5 py-2.5 text-center text-white"
              >
                Validar
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ValidateUser;
