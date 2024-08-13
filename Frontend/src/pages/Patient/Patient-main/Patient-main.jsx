import { useEffect, useState } from "react";
import CardOptions from "../../../components/Cards/CardOptions";
import Icon from "../../../components/Icon/Icon";
import useLanguage from "../../../hooks/useLanguage";
import ActivePatient from "../../../components/ActivePatient/ActivePatient";
import { verifyUserStatus } from "../../../services/patientService";
import LateralMenu from "../components/LateralMenu";

const PatientMain = () => {
  const [showActivationPopup, setShowActivationPopup] = useState(false);

  useEffect(() => {
    const fetchUserStatus = async () => {
      const authToken = localStorage.getItem("authToken");
      if (authToken) {
        try {
          const result = await verifyUserStatus(authToken);
          if (!result.is_patient) {
            setShowActivationPopup(true);
          }
        } catch (error) {
          console.error("Error al verificar el estado del paciente:", error);
        }
      }
    };

    fetchUserStatus();
  }, []);

  const handleCompleteLater = () => {
    setShowActivationPopup(false);
  };

  const handleActivationComplete = () => {
    localStorage.setItem("hasCompletedActivation", "true");
    setShowActivationPopup(false);
  };

  const languageData = useLanguage();

  if (!languageData) {
    return <div>Cargando datos...</div>;
  }

  return (
    <main className="relative max-w-screen-lg mx-auto flex flex-col items-center w-full px-4 pb-6 gap-7">
      <section className="max-w-screen-lg w-full">
        <LateralMenu />
      </section>
      <h2 className="font-medium text-3xl md:text-4xl mt-7 self-start">
        {languageData.patientMain.locateTitle}{" "}
        <span className="font-medium text-[#A0A4A8]">
          {languageData.patientMain.locateSubtitle}
        </span>
      </h2>
      <div className="w-full relative h-[56px] rounded-lg bg-[#F6F6F6] my-auto">
        <input
          placeholder={languageData.patientMain.searchPlaceholder}
          className="w-full h-full bg-transparent pl-4 outline-none"
        />
        <div className="absolute top-[30%] right-[1%]">
          <Icon name="search" />
        </div>
      </div>
      <section className="grid grid-cols-2 gap-4 w-full h-full mt-5">
        {languageData.patientMain.cardData.map((card) => (
          <CardOptions
            key={card.id}
            icon={card.icon}
            title={card.title}
            color={card.color}
            link={card.link}
          />
        ))}
      </section>

      {showActivationPopup && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50 backdrop-blur-sm backdrop-brightness-75">
          <div className="bg-white p-6 rounded-lg shadow-lg w-[90%] max-w-lg">
            <ActivePatient onComplete={handleActivationComplete} />
            <div className="flex justify-end mt-4">
              <button
                onClick={handleCompleteLater}
                className="mr-4 bg-gray-200 text-gray-700 rounded px-4 py-2"
              >
                Completar más tarde
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
};

export default PatientMain;
