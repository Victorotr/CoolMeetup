import axios from "axios";
import { Handler } from "../context/Context";
import { useNavigate } from "react-router";
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from "jwt-decode";

const Signup = () => {
  const {settoast, setuser} = Handler();
  const navigate = useNavigate();
  const submitForm = (e) => {
    e.preventDefault();

    //lanzar login en la api
    const formData = new FormData(e.target);
    const form_values = Object.fromEntries(formData);
    
    axios.post(import.meta.env.VITE_API_URL+'/registerUser',
      {
        mail: form_values.email,
        pwd: form_values.password,
        name: form_values.nombre_usuario
      },
      {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'origin':'x-requested-with',
        'Access-Control-Allow-Headers': 'POST, GET, PUT, DELETE, OPTIONS, HEAD, Authorization, Origin, Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers, Access-Control-Allow-Origin',
        'Content-Type': 'application/json',
      },
    }).then(function(response){
      settoast({on:true,type:'warning',text:'Te has registrado con éxito, consulta tu e-mail para validar tu cuenta y empezar a usar Coolmeetups. ¡Gracias!'});
      navigate('/signin');
    }).catch(function (error){
      settoast({on:true,type:'error',text:error.response.data.message});
    })
  };

  const loginRegisterWithGoogle = (name,email) => {
    axios.post(import.meta.env.VITE_API_URL+'/loginRegisterWithGoogle',
    {
      mail: email,
      name: name
    },
    {
    headers: {
      'Access-Control-Allow-Origin': '*',
      'origin':'x-requested-with',
      'Access-Control-Allow-Headers': 'POST, GET, PUT, DELETE, OPTIONS, HEAD, Authorization, Origin, Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers, Access-Control-Allow-Origin',
      'Content-Type': 'application/json',
    },
  }).then(function(response){
    settoast({on:true,type:'warning',text:response.data.message});
    setuser({name: name});
    navigate('/list/meetups');
    //redigirig al dashboard del usuario y meter el usuario en el contexto
  }).catch(function (error){
    settoast({on:true,type:'error',text:error.message});
  })
  }

  return (
    <section className="bg-zinc-50">
      <div className="flex flex-col items-center justify-center px-6 py-32">
        <div className="w-full bg-zinc-50 border rounded-lg  md:mt-0 sm:max-w-md xl:p-0 shadow-md">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
              Regístrate en Coolmeetups.com
            </h1>
            <form className="space-y-4 md:space-y-6" onSubmit={submitForm}>
            <div>
                <label
                  htmlFor="nombre_usuario"
                  className="block mb-2 text-sm font-medium text-gray-900 "
                >
                  Nombre de usuario
                </label>
                <input
                  type="text"
                  name="nombre_usuario"
                  id="nombre_usuario"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg  focus:border-primary-600 block w-full p-2.5  "
                  placeholder="Un nombre cool...!"
                  required="required"
                />
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-gray-900 "
                >
                  Correo electrónico
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg  focus:border-primary-600 block w-full p-2.5  "
                  placeholder="tucorreo@gmail.com"
                  required="required"
                />
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium text-gray-900 "
                >
                  Contraseña
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="••••••••"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg  focus:border-primary-600 block w-full p-2.5 "
                  required="required"
                />
              </div>
              
              <button
                type="submit"
                className="w-full border border-blue-900 bg-blue-600/90 focus:ring-4 shadow focus:outline-none  font-medium rounded-lg text-sm px-5 py-2.5 text-center text-white"
              >
                Regístrate
              </button>
              <p className="text-sm font-light text-gray-500 ">
                Ya estás registrado? {''}
                <a
                  href="/signin"
                  className="font-medium text-primary-600 hover:underline "
                >
                  Entra en tu cuenta
                </a>
              </p>
              <div className="w-full h-[1px] border flex items-center justify-center">
                <span className="bg-zinc-50 w-10 h-10 flex items-center justify-center text-zinc-900/70">
                  o
                </span>
              </div>
              <div>
              <GoogleLogin onSuccess={(credentialResponse) => {
                const USER_CREDENTIAL = jwtDecode(credentialResponse.credential);
                const USER_NAME = USER_CREDENTIAL.name;
                const USER_EMAIL = USER_CREDENTIAL.email;
                //llamar endpoint que comprobará si existe o no este usuario logueado por google
                //Si no existe, crear y loguear
                //Si existe y está activo, loguear
                loginRegisterWithGoogle(USER_NAME, USER_EMAIL);
              }}
              onError = {() => {console.log('Login Failed');}}
              />
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Signup;
