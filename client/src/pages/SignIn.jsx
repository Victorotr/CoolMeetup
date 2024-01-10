const SignIn = () => {
  return (
    <section className="bg-zinc-50">
      <div className="flex flex-col items-center justify-center px-6 py-32">
        <div className="w-full bg-zinc-50 border rounded-lg  md:mt-0 sm:max-w-md xl:p-0 shadow-md">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
              Acceso a tu perfíl
            </h1>
            <form className="space-y-4 md:space-y-6" action="#">
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
                  required=""
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
                  required=""
                />
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      id="remember"
                      aria-describedby="remember"
                      type="checkbox"
                      className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 "
                      required={false}
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <label htmlFor="remember" className="text-gray-500 ">
                      Mantener sesión abierta
                    </label>
                  </div>
                </div>
                <a
                  href="/password/reset"
                  className="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500"
                >
                  Has olvidado tu contraseña?
                </a>
              </div>
              <button
                type="submit"
                className="w-full border border-blue-900 bg-blue-600/90 focus:ring-4 shadow focus:outline-none  font-medium rounded-lg text-sm px-5 py-2.5 text-center text-white"
              >
                Acceso
              </button>
              <p className="text-sm font-light text-gray-500 ">
                No estás registrado? {''}
                <a
                  href="/signup"
                  className="font-medium text-primary-600 hover:underline "
                >
                  Regístrate
                </a>
              </p>
              <div className="w-full h-[1px] border flex items-center justify-center">
                <span className="bg-zinc-50 w-10 h-10 flex items-center justify-center text-zinc-900/70">
                  o
                </span>
              </div>
              <button className="mx-auto p-2 border w-full text-zinc-900/90 font-semibold rounded-md">
                Google
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SignIn;
