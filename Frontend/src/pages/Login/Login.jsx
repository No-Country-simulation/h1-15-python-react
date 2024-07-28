import { useState } from "react";
import eye from "/icons/eye.svg";
import eye_off from "/icons/eye_off.svg";
import { useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { showToast } from "../../utils/toast";

const Login = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [email, setEmail] = useState("example@example.com");
  const [password, setPassword] = useState("Password123");
  const navigate = useNavigate();

  const togglePasswordVisibility = () => setPasswordVisible(prev => !prev);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email === "example@example.com" && password === "Password123") {
      navigate("/patient");
    } else {
      showToast("Credenciales inválidas.", "error");
    }
  };

  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-4 bg-gradient-background_1">
      <ToastContainer />
      <section className="cursor-pointer max-w-[206px]">
        <img onClick={() => navigate("/")} src="/justinaLogo.png" alt="logo" />
      </section>
      <section className="flex flex-col justify-center w-full p-6 bg-white shadow-lg rounded-lg lg:max-w-[548px]">
        <h1 className="text-2xl font-bold text-center">Iniciar Sesión</h1>
        <p className="mt-6 text-center text-sm text-text_primary">
          ¿No tienes cuenta?
          <span
            onClick={() => navigate("/register")}
            className="ml-1 font-semibold cursor-pointer text-text_secondary"
          >
            Regístrate
          </span>
        </p>
        <form className="flex flex-col space-y-6 mt-6" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="email" className="block text-sm font-medium">
              Correo
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="Ingrese su correo electrónico"
              className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-secondary-500 focus:border-secondary-500 sm:text-sm"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium">
              Contraseña
            </label>
            <div className="relative">
              <input
                id="password"
                type={passwordVisible ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="Ingrese una contraseña"
                className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-secondary-500 focus:border-secondary-500 sm:text-sm"
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute inset-y-0 right-0 flex items-center pr-4"
              >
                <img
                  src={passwordVisible ? eye_off : eye}
                  alt={passwordVisible ? "Ocultar contraseña" : "Mostrar contraseña"}
                  className="w-4 h-4"
                />
              </button>
            </div>
          </div>
          <div className="flex justify-between">
            <div className="flex items-center">
              <input
                id="remember-me"
                type="checkbox"
                className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
              <label htmlFor="remember-me" className="ml-2 text-sm">
                Recuérdame
              </label>
            </div>
            <span className="text-sm cursor-pointer text-text_secondary font-bold">
              ¿Olvidaste tu contraseña?
            </span>
          </div>
          <button
            type="submit"
            className="w-full py-2 text-sm font-medium text-white bg-gradient-button rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-secondary-500"
          >
            Iniciar Sesión
          </button>
        </form>

        <div className="flex items-center py-6">
          <hr className="w-1/2 border-gray-200" />
          <span className="px-2 text-sm">O</span>
          <hr className="w-1/2 border-gray-200" />
        </div>

        <div className="flex flex-col gap-4">
          <button
            type="button"
            className="flex items-center justify-center w-full py-2 px-4 text-sm font-semibold border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
          >
            <img src="./icons/google.svg" alt="Google" className="mr-2 w-5 h-5" />
            <span>Continuar con Google</span>
          </button>
          <button
            type="button"
            className="flex items-center justify-center w-full py-2 px-4 text-sm font-semibold border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            <img src="./icons/facebook.svg" alt="Facebook" className="mr-2 w-5 h-5" />
            <span>Continuar con Facebook</span>
          </button>
        </div>
      </section>
    </main>
  );
};

export default Login;
