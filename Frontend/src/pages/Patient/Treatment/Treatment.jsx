import { useState, useEffect } from "react";
import CardEvent from "../../../components/Cards/CardEvent";
import CardTitle from "../../../components/Cards/CardTitle";
import FooterNav from "../../../components/FooterNav/FooterNav";
import Profile from "../../../components/Profile/Profile";
import useLanguage from "../../../hooks/useLanguage";

const Treatment = () => {
  const [selectedColor, setSelectedColor] = useState("");
  const [events, setEvents] = useState([]);
  const languageData = useLanguage(); 

  useEffect(() => {
    if (languageData) {
      setEvents(languageData.Treatment.cardEvent); 
    }
  }, [languageData]);

  const filteredEvents = selectedColor
    ? events.filter((event) => event.color === selectedColor)
    : events;

  const pendingMedicationsCount = events.filter(
    (event) => event.color === "#D22B8B"
  ).length;

  if (!languageData) {
    return <div>Cargando datos...</div>;
  }

  return (
    <div className="max-w-screen-lg mx-auto pb-14">
      <section className="p-4">
        <Profile
          icon_name={languageData.Treatment.Profile.icon_name}
          greeting={languageData.Treatment.Profile.greeting}
          patientName={languageData.Treatment.Profile.patientName}
          photo={languageData.Treatment.Profile.photo}
        />
      </section>
      <section className="flex flex-wrap shadow-inner-custom">
        <div className="w-1/2">
          <CardTitle
            titles={languageData.Treatment.CardTitle[0].titles}
            backgroundColor={languageData.Treatment.CardTitle[0].backgroundColor}
            textColor={languageData.Treatment.CardTitle[0].textColor}
            onClick={() => setSelectedColor(languageData.Treatment.CardTitle[0].backgroundColor)}
          />
        </div>
        <div className="w-1/2">
          <CardTitle
            titles={[languageData.Treatment.CardTitle[1].titles[0], pendingMedicationsCount]}
            backgroundColor={languageData.Treatment.CardTitle[1].backgroundColor}
            textColor={languageData.Treatment.CardTitle[1].textColor}
            onClick={() => setSelectedColor(languageData.Treatment.CardTitle[1].backgroundColor)}
          />
        </div>
      </section>
      <section className="grid">
        {filteredEvents.map((event, index) => (
          <CardEvent
            key={index}
            color={event.color}
            eventAction={event.action}
            eventName={event.name}
            eventTime={event.time}
            eventTimeUnit={event.unit}
          />
        ))}
      </section>
      <section>
        <FooterNav />
      </section>
    </div>
  );
};

export default Treatment;
