import { useEffect, useState } from "react";
import FooterNav from "../../../components/FooterNav/FooterNav";
import Profile from "../../../components/Profile/Profile";
import data from "../../../data/patientDataSchedule.json";
import CardSchedule from "./CardSchedule";
import AddItemButton from "../../../components/AddItemButton";
import Calendar from "./Calendar";
import useLanguage from "../../../hooks/useLanguage";
import LateralMenu from "../components/LateralMenu";

const Schedule = () => {
  const [schedules, setSchedules] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const today = new Date();
  const languageData = useLanguage();
  useEffect(() => {
    setSchedules(data);
  }, []);

  const handleDateClick = (date) => {
    setSelectedDate(date);
  };

  const formatDate = (date) => {
    const options = { weekday: "short", day: "numeric", month: "long" };
    return date.toLocaleDateString("es-ES", options);
  };

  const filteredSchedules = selectedDate
    ? schedules.filter((schedule) => schedule.date === formatDate(selectedDate))
    : schedules.filter((schedule) => schedule.date === formatDate(today));

  if (schedules.length === 0 || !languageData) {
    return <div>Cargando datos...</div>;
  }

  return (
    <div className="relative max-w-screen-lg mx-auto flex flex-col min-h-screen">
      <section className="px-2">
        <LateralMenu />
      </section>
      <Profile
        icon_name={languageData.Schedule.Profile.icon_name}
        greeting={languageData.Schedule.Profile.greeting}
      />

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
            {languageData.Schedule.warning.message}
          </p>
        )}
      </section>
      <section className="fixed justify-end right-2 bottom-20">
        <AddItemButton
          to="/patient/doctor-information"
          label={languageData.Schedule.AddItemButton.text}
        />
      </section>

      <FooterNav />
    </div>
  );
};

export default Schedule;
