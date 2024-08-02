import { useEffect, useState } from "react";
import Calendar from "../../../components/Calendar/Calendar";
import FooterNav from "../../../components/FooterNav/FooterNav";
import Profile from "../../../components/Profile/Profile";
import data from "../../../data/patientDataSchedule.json";
import CardSchedule from "./CardSchedule";

const Schedule = () => {
  const [schedules, setSchedules] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const today = new Date();

  useEffect(() => {
    setSchedules(data);
    console.log("Data cargada:", data);
  }, []);

  const handleDateClick = (date) => {
    setSelectedDate(date);
    console.log("Fecha seleccionada:", date);
  };

  const formatDate = (date) => {
    const options = { weekday: "short", day: "numeric", month: "long" };
    return date.toLocaleDateString("es-ES", options);
  };

  const filteredSchedules = selectedDate
    ? schedules.filter((schedule) => schedule.date === formatDate(selectedDate))
    : schedules.filter((schedule) => schedule.date === formatDate(today));

  console.log(
    "Fecha seleccionada formateada:",
    selectedDate ? formatDate(selectedDate) : formatDate(today),
  );
  console.log("Citas filtradas:", filteredSchedules);

  if (schedules.length === 0) {
    return <div>Cargando...</div>;
  }

  return (
    <div className="max-w-screen-lg mx-auto flex flex-col min-h-screen">
      <Profile
        icon_name="calendarOrange"
        greeting="Estos son tus turnos,"
        patientName="Laura!"
        photo="/Bung1.png"
      />
      
      {/* Calendario fijo en la parte superior */}
      <section className="sticky top-0 z-10 bg-[#fff]">
          <Calendar onDateClick={handleDateClick} />
      </section>

      <section className="grid md:grid-cols-2 gap-2 px-4 py-6 pb-20">
        {filteredSchedules.length > 0 ? (
          filteredSchedules.map((schedule) => (
            <CardSchedule
              key={schedule.id}
              id={schedule.id}
              profileImage={schedule.profileImage}
              name={schedule.name}
              specialty={schedule.specialty}
              date={schedule.date}
              timeRange={schedule.timeRange}
            />
          ))
        ) : (
          <p className="col-span-2 text-center text-gray-500">
            No tienes citas pendientes para esta fecha
          </p>
        )}
      </section>

      <FooterNav />
    </div>
  );
};

export default Schedule;
