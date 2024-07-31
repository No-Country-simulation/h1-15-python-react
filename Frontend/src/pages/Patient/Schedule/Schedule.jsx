import { useEffect, useState } from "react";
import Calendar from "../../../components/Calendar/Calendar";
import CardSchedule from "../../../components/Cards/CardSchedule";
import FooterNav from "../../../components/FooterNav/FooterNav";
import Profile from "../../../components/Profile/Profile";
import data from "../../../data/patientDataSchedule.json";

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
    <div className="max-w-lg mx-auto flex flex-col min-h-screen pb-16">
      <Profile
        icon_name="calendarOrange"
        greeting="Estos son tus turnos,"
        patientName="Laura!"
        photo="/Bung1.png"
      />
      <section className="flex flex-col space-y-[18px] px-2 pb-[420px]">
        {filteredSchedules.map((schedule) => (
          <CardSchedule
            key={schedule.id}
            profileImage={schedule.profileImage}
            name={schedule.name}
            specialty={schedule.specialty}
            date={schedule.date}
            timeRange={schedule.timeRange}
          />
        ))}
      </section>
      <section className="bg-[#CAD6FF] pb-4">
        <Calendar onDateClick={handleDateClick} />
      </section>
      <FooterNav />
    </div>
  );
};

export default Schedule;
