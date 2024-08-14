import { useState } from "react";
import { useNavigate } from "react-router-dom";
import LanguageSelector from "../../../languages/selector/LanguageSelector";
import useLanguage from "../../../hooks/useLanguage";
import DarkModeSelector from "../../../languages/selector/DarkModeSelector";

const SettingsPanel = () => {
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [appNotifications, setAppNotifications] = useState(true);

  const navigate = useNavigate();

  // Función para redirigir al usuario
  const changePassword = () => {
    navigate("/patient/update-password");
  };

  const languageData = useLanguage();

  if (!languageData) {
    return <div>Cargando dados...</div>;
  }

  return (
    <div className="p-6 max-w-screen-lg mx-auto h-screen">
      <h2 className="text-3xl font-semibold mb-6">
        {languageData.settings.title}
      </h2>

      {/* Tema */}
      <div className="mb-6">
        <h3 className="text-lg mb-3 font-semibold">
          {languageData.settings.theme} 
        </h3>
        <div className="flex items-center justify-between">
          <span className=" mr-4">{languageData.settings.darkMode} (Beta)</span>
          <DarkModeSelector />
        </div>
      </div>

      {/* Notificaciones */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-3">
          {languageData.settings.notifications}
        </h3>
        <div className="flex items-center mb-3 justify-between">
          <span className=" mr-4">
            {languageData.settings.emailNotifications}
          </span>
          <label className="flex items-center cursor-pointer">
            <input
              type="checkbox"
              className="sr-only"
              checked={emailNotifications}
              onChange={() => setEmailNotifications(!emailNotifications)}
            />
            <div
              className={`relative w-14 h-8 rounded-full transition-colors ${emailNotifications ? "bg-Justina_1" : "bg-Justina_6"}`}
            >
              <div
                className={`absolute left-1 top-1 bg-white w-6 h-6 rounded-full transition-transform ${emailNotifications ? "translate-x-full" : ""}`}
              ></div>
            </div>
          </label>
        </div>
        <div className="flex items-center justify-between">
          <span className=" mr-4">
            {languageData.settings.appNotifications}
          </span>
          <label className="flex items-center cursor-pointer">
            <input
              type="checkbox"
              className="sr-only"
              checked={appNotifications}
              onChange={() => setAppNotifications(!appNotifications)}
            />
            <div
              className={`relative w-14 h-8 rounded-full transition-colors ${appNotifications ? "bg-Justina_1" : "bg-Justina_6"}`}
            >
              <div
                className={`absolute left-1 top-1 bg-white w-6 h-6 rounded-full transition-transform ${appNotifications ? "translate-x-full" : ""}`}
              ></div>
            </div>
          </label>
        </div>
      </div>

      {/* Idioma */}

      <div className="block mb-20">
        <span className=" font-semibold">{languageData.settings.language}</span>
        <div className="pt-3">
          <LanguageSelector />
        </div>
      </div>

      {/* Configuración de Cuenta */}
      <div className="flex gap-3 justify-center md:justify-end items-center">
        <button
          onClick={changePassword}
          className="bg-magentaButton text-white p-2 md:px-4 rounded-lg text-sm md:text-base"
        >
          {languageData.settings.changePassword}
        </button>
        <button className="bg-red-500 text-white p-2 md:px-4 rounded-lg text-sm md:text-base">
          {languageData.settings.deleteAccount}
        </button>
      </div>
    </div>
  );
};

export default SettingsPanel;
