import { useState, useEffect } from "react";
import eye from "/icons/eye.svg";
import eye_off from "/icons/eye_off.svg";
import { useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { showToast } from "../../utils/toast";
import useLanguage from "../../hooks/useLanguage";
import { loginUser } from "../../services/auth";

const Login = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    const userType = localStorage.getItem("userType");
    if (token && userType) {
      navigate(`/${userType}`);
    }

    const storedEmail = localStorage.getItem("rememberMeEmail");
    const storedPassword = localStorage.getItem("rememberMePassword");
    if (storedEmail && storedPassword) {
      setEmail(storedEmail);
      setPassword(storedPassword);
      setRememberMe(true);
    }
  }, [navigate]);

  const togglePasswordVisibility = () => setPasswordVisible((prev) => !prev);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await loginUser(email, password);

      localStorage.setItem("authToken", data.access);
      localStorage.setItem("userType", data.user_types.toLowerCase());
      localStorage.setItem("userEmail", email);
      localStorage.setItem("userId", data.id_user);

      if (rememberMe) {
        localStorage.setItem("rememberMeEmail", email);
        localStorage.setItem("rememberMePassword", password);
      } else {
        localStorage.removeItem("rememberMeEmail");
        localStorage.removeItem("rememberMePassword");
      }

      // Redirige a la página /update-password solo si es el primer inicio de sesión
      if (data.first_login) {
        navigate(`/${data.user_types.toLowerCase()}/update-password`);
      } else {
        // Redirige al tipo de usuario después del primer inicio de sesión
        navigate(`/${data.user_types.toLowerCase()}`);
      }
    } catch (error) {
      console.error("Login Error:", error); // Log error
      showToast("Credenciales inválidas.", "error");
    }
  };

  const languageData = useLanguage();

  if (!languageData) {
    return <div>Cargando datos...</div>;
  }

  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-4 bg-gradient-background_1">
      <ToastContainer />
      <section className="cursor-pointer max-w-[206px]">
        <img onClick={() => navigate("/")} src="/justinaLogo.webp" alt="logo" />
      </section>
      <section className="flex flex-col justify-center w-full p-6 bg-white shadow-lg rounded-lg lg:max-w-[548px]">
        <h1 className="text-2xl font-bold text-center">
          {languageData.login.title}
        </h1>
        <p className="mt-6 text-center text-sm text-text_primary">
          {languageData.login.noAccount}
          <span
            onClick={() => navigate("/register")}
            className="ml-1 font-semibold cursor-pointer text-text_secondary"
          >
            {languageData.login.register}
          </span>
        </p>
        <form className="flex flex-col space-y-6 mt-6" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="email" className="block text-sm font-medium">
              {languageData.login.emailLabel}
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder={languageData.login.emailPlaceholder}
              className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-secondary-500 focus:border-secondary-500 sm:text-sm"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium">
              {languageData.login.passwordLabel}
            </label>
            <div className="relative">
              <input
                id="password"
                type={passwordVisible ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder={languageData.login.passwordPlaceholder}
                className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-secondary-500 focus:border-secondary-500 sm:text-sm"
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute inset-y-0 right-0 flex items-center pr-4"
              >
                <img
                  src={passwordVisible ? eye_off : eye}
                  alt={
                    passwordVisible
                      ? languageData.login.eyeAltHide
                      : languageData.login.eyeAltShow
                  }
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
                checked={rememberMe}
                onChange={() => setRememberMe((prev) => !prev)}
                className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
              <label htmlFor="remember-me" className="ml-2 text-sm">
                {languageData.login.rememberMe}
              </label>
            </div>
            <span className="text-sm cursor-pointer text-text_secondary font-bold">
              {languageData.login.forgotPassword}
            </span>
          </div>
          <button
            type="submit"
            className="w-full py-2 text-sm font-medium text-white bg-gradient-button rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-secondary-500"
          >
            {languageData.login.loginButton}
          </button>
        </form>

        <div className="flex items-center py-6">
          <hr className="w-1/2 border-gray-200" />
          <span className="px-2 text-sm">{languageData.login.or}</span>
          <hr className="w-1/2 border-gray-200" />
        </div>

        <div className="flex flex-col gap-4">
          <button
            type="button"
            className="flex items-center justify-center w-full py-2 px-4 text-sm font-semibold border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
          >
            <img
              src="./icons/google.svg"
              alt="Google"
              className="mr-2 w-5 h-5"
            />
            <span>{languageData.login.googleSignIn}</span>
          </button>
          <button
            type="button"
            className="flex items-center justify-center w-full py-2 px-4 text-sm font-semibold border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            <img
              src="./icons/facebook.svg"
              alt="Facebook"
              className="mr-2 w-5 h-5"
            />
            <span>{languageData.login.facebookSignIn}</span>
          </button>
        </div>
      </section>
    </main>
  );
};

export default Login;
