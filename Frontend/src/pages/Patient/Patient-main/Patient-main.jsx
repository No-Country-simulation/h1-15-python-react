import { useEffect, useState, useRef } from "react";
import CardOptions from "../../../components/Cards/CardOptions";
import Icon from "../../../components/Icon/Icon";
import Logout from "../../../components/Logout/Logout";
import useLanguage from "../../../hooks/useLanguage";
import UserInitials from "../../../components/UserInitials";

const PatientMain = () => {
  const [showLogout, setShowLogout] = useState(false);
  const profileRef = useRef(null);
  const toggleLogout = () => setShowLogout((prev) => !prev);

  const handleClickOutside = (event) => {
    if (profileRef.current && !profileRef.current.contains(event.target)) {
      setShowLogout(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const languageData = useLanguage();

  if (!languageData) {
    return <div>Cargando datos...</div>;
  }

  return (
    <main className="relative max-w-screen-lg mx-auto flex flex-col items-center w-full p-6 gap-7">
      <nav className="flex justify-between w-full items-center">
        <Icon name="bars" />
        <div ref={profileRef} className="relative">
          <UserInitials onClick={toggleLogout} />
          {showLogout && (
            <div className="absolute mt-2 right-0 z-10">
              <Logout />
            </div>
          )}
        </div>
      </nav>
      <h2 className="font-medium text-3xl md:text-4xl text-[#25282B] mt-7 self-start">
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
    </main>
  );
};

export default PatientMain;
