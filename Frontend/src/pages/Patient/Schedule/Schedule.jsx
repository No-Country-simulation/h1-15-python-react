import { useEffect, useState } from "react";
import Calendar from "../../../components/Calendar/Calendar";
import CardSchedule from "../../../components/Cards/CardSchedule";
import FooterNav from "../../../components/FooterNav/FooterNav";
import Profile from "../../../components/Profile/Profile";
import data from "../../../data/patientDataSchedule.json";

const Schedule = () => {
  const [schedules, setSchedules] = useState([]);

  useEffect(() => {
    setSchedules(data);
  }, []);

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
        {schedules.map((schedule) => (
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
        <Calendar />
      </section>
      <FooterNav />
    </div>
  );
};

export default Schedule;
