import { useNavigate } from "react-router-dom";
import useLanguage from "../../hooks/useLanguage";

const NotFound = () => {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate("/");
  };

  const languageData = useLanguage();

  if (!languageData) {
    return <div>Cargando datos...</div>;
  }

  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-4">
      <div className="text-center mb-4">
        <h1 className="text-3xl font-bold mb-2">
          {languageData.NotFound.title}
        </h1>
        <p className="text-lg mb-4">{languageData.NotFound.message}</p>
        <button
          onClick={handleGoHome}
          className="px-4 py-2 bg-Justina_1 text-white font-semibold rounded-lg"
        >
          {languageData.NotFound.button}
        </button>
      </div>
      <hr className="w-full mt-8 border-t-2 border-gray-300" />
      <div className="mt-4">
        <img src="/justinaLogo.webp" alt="Logo" className="w-48 h-auto" />
      </div>
    </main>
  );
};

export default NotFound;
