import { useState, useEffect } from "react";
import CardEvent from "../../components/Cards/CardEvent";
import CardTitle from "../../components/Cards/CardTitle";
import FooterNav from "../../components/FooterNav/FooterNav";
import Profile from "../../components/Profile/Profile";
import data from "../../data/cardEvent.json";

const Treatment = () => {
  const [selectedColor, setSelectedColor] = useState("");
  const [events, setEvents] = useState([]);

  useEffect(() => {
    setEvents(data);
  }, []);

  const filteredEvents = selectedColor
    ? events.filter(event => event.color === selectedColor)
    : events;

  const pendingMedicationsCount = events.filter(
    event => event.color === "#D22B8B"
  ).length;

  return (
    <div className="max-w-lg mx-auto pb-14">
      <section className="p-4">
        <Profile
          icon_name="medicine"
          greeting="Buen día, Laura!"
        />
      </section>
      <section className="flex flex-wrap shadow-inner-custom">
        <div className="w-1/2">
          <CardTitle
            titles={["Tratamientos"]}
            backgroundColor="#6ED1AF"
            textColor="#FFF"
            onClick={() => setSelectedColor("#6ED1AF")}
          />
        </div>
        <div className="w-1/2">
          <CardTitle
            titles={["Medicamentos Pendientes:", pendingMedicationsCount]}
            backgroundColor="#D22B8B"
            textColor="#FFF"
            onClick={() => setSelectedColor("#D22B8B")}
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
