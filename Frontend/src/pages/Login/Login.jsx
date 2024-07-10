const Login = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <main className="flex p-4 flex-col items-center justify-center min-h-screen bg-gradient-background_1">
      <section className="max-w-[206px]">
        <img src="/justinaLogo.png" alt="logo" />
      </section>
      <section className="flex lg:max-w-[548px] flex-col justify-center p-[24px] bg-white shadow-lg rounded-lg overflow-hidden w-full">
        <section>
          <h1 className="text-center text-[32px] font-bold">Iniciar Sesión</h1>
          <p className="mt-6 text-center text-sm text-text_primary">
            ¿No tienes cuenta?
            <span className="ml-1 text-text_secondary font-semibold cursor-pointer">
              Regístrate
            </span>
          </p>
        </section>
        <section className="flex flex-col justify-center w-full">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="email" className="block text-sm font-medium">
                Correo
              </label>
              <input
                id="email"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-secondary-500 focus:border-secondary-500 sm:text-sm"
                type="email"
                placeholder="Ingrese su correo electrónico"
                required
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium">
                Contraseña
              </label>
              <input
                id="password"
                className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-secondary-500 focus:border-secondary-500 sm:text-sm"
                type="password"
                placeholder="Ingrese una contraseña"
                required
              />
            </div>
            <section className="flex justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm">
                  Recuérdame
                </label>
              </div>
              <div className="text-sm cursor-pointer text-text_secondary">
                <b>¿Olvidaste tu contraseña?</b>
              </div>
            </section>
            <div>
              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gradient-button focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-secondary-500"
              >
                Iniciar Sesión
              </button>
            </div>
          </form>

          <div className="flex items-center px-0 py-6">
            <hr className="border-gray-200 mt-4 w-1/2" />
            <span className="px-2 text-sm">O</span>
            <hr className="border-gray-200 mt-4 w-1/2" />
          </div>

          <section className="flex flex-col gap-4">
            <div>
              <button
                type="button"
                className="w-full flex items-center justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
              >
                <img
                  src="./icons/google.svg"
                  alt="Google"
                  className="mr-2 w-5 h-5"
                />
                <span>Continuar con Google</span>
              </button>
            </div>
            <button
              type="button"
              className="w-full flex items-center justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              <img
                src="./icons/facebook.svg"
                alt="facebook"
                className="mr-2 w-5 h-5"
              />
              <span>Continuar con Facebook</span>
            </button>
          </section>
        </section>
      </section>
    </main>
  );
};

export default Login;
