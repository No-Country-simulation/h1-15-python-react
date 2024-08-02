import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate("/");
  };

  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-4 font-sans">
      <div className="text-center mb-4">
        <h1 className="text-3xl font-bold mb-2">404 - Página no encontrada</h1>
        <p className="text-lg mb-4">
          Lo sentimos, la página que estás buscando no existe.
        </p>
        <button
          onClick={handleGoHome}
          className="px-4 py-2 bg-Justina_1 text-white font-semibold rounded-lg"
        >
          Volver a Inicio
        </button>
      </div>
      <hr className="w-full mt-8 border-t-2 border-gray-300" />
      <div className="mt-4">
        <img src="/justinaLogo.png" alt="Logo" className="w-48 h-auto" />
      </div>
    </main>
  );
};

export default NotFound;
