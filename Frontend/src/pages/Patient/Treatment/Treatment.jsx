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
    if (languageData?.Treatment?.cardEvent) {
      setEvents(languageData.Treatment.cardEvent);
    }
  }, [languageData]);

  const filteredEvents = selectedColor
    ? events.filter((event) => event.color === selectedColor)
    : events;

  const pendingMedicationsCount = events.filter(
    (event) => event.color === "#D22B8B",
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
        />
      </section>
      <section className="flex flex-wrap shadow-inner-custom">
        {languageData.Treatment.CardTitle.map((card, index) => (
          <div key={index} className="w-1/2">
            <CardTitle
              titles={
                index === 1
                  ? [card.titles[0], pendingMedicationsCount]
                  : card.titles
              }
              backgroundColor={card.backgroundColor}
              textColor={card.textColor}
              onClick={() => setSelectedColor(card.backgroundColor)}
            />
          </div>
        ))}
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
