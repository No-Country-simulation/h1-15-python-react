import  { useState } from "react";
import BackButton from "../BackButton/BackButton";
import { showToast } from "../../utils/toast";
import { ToastContainer } from "react-toastify";
import { useNavigate } from 'react-router-dom';

const PageConstruction = () => {
  const [email, setEmail] = useState("");

  const navigate = useNavigate();


  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };


  const handleSubmit = (e) => {
    e.preventDefault();
    showToast("Serás notificado.", "success");

    setTimeout(() => {
      navigate('/patient');
    }, 2000); 
  };

  return (
    <main>
      <BackButton />
      <div className="flex flex-col items-center justify-center min-h-screen p-4 font-sans">
        <div className="text-center mb-4">
          <h1 className="text-2xl font-bold mb-2">
            ¡Esta sección está en construcción!
          </h1>
          <p className="text-lg mb-4">Notificarme cuando esté disponible</p>
          <form
            onSubmit={handleSubmit}
            className="flex flex-col sm:flex-row items-center"
          >
            <input
              type="email"
              value={email}
              onChange={handleEmailChange}
              placeholder="Introduce tu correo electrónico"
              required
              className="px-4 py-2 border rounded-lg outline-none w-full mb-2 sm:mb-0 sm:mr-2"
            />
            <button
              type="submit"
              className="px-4 py-2 bg-Justina_1 text-white font-semibold rounded-lg"
            >
              Enviar
            </button>
          </form>
        </div>
        <hr className="w-full mt-8 border-t-2 border-gray-300" />
        <div className="mt-4">
          <img src="/justinaLogo.png" alt="Logo" className="w-48 h-auto" />
        </div>
      </div>
      <ToastContainer />
    </main>
  );
};

export default PageConstruction;
