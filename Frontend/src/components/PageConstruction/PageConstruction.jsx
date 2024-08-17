import { useState } from "react";
import { showToast } from "../../utils/toast";
import { ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";
import useLanguage from "../../hooks/useLanguage";

const PageConstruction = () => {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const userType = localStorage.getItem("userType");

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    showToast(languageData.PageConstruction.toastSuccessMessage, "success");

    setTimeout(() => {
      navigate(`/${userType}`);
    }, 2000);
  };

  const languageData = useLanguage();

  if (!languageData) {
    return <div>Cargando datos...</div>;
  }

  return (
    <main>
      <div className="flex flex-col items-center justify-center min-h-screen p-4">
        <div className="text-center mb-4">
          <h1 className="text-2xl font-bold mb-2">
            {languageData.PageConstruction.title}
          </h1>
          <p className="text-lg mb-4">
            {languageData.PageConstruction.message}
          </p>
          <form
            onSubmit={handleSubmit}
            className="flex flex-col sm:flex-row items-center"
          >
            <input
              type="email"
              value={email}
              onChange={handleEmailChange}
              placeholder={languageData.PageConstruction.emailPlaceholder}
              required
              className="px-4 py-2 border rounded-lg outline-none w-full mb-2 sm:mb-0 sm:mr-2"
            />
            <button
              type="submit"
              className="px-4 py-2 bg-Justina_1 text-white font-semibold rounded-lg"
            >
              {languageData.PageConstruction.submitButton}
            </button>
          </form>
        </div>
        <hr className="w-full mt-8 border-t-2 border-gray-300" />
        <div className="mt-4">
          <img
            src="/justinaLogo.webp"
            alt={languageData.PageConstruction.logoAltText}
            className="w-48 h-auto"
          />
        </div>
      </div>
      <ToastContainer />
    </main>
  );
};

export default PageConstruction;
