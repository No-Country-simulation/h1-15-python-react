import { useEffect, useState } from 'react';
import Calendar from "../../../components/Calendar/Calendar";
import CardSchedule from "../../../components/Cards/CardSchedule";
import FooterNav from "../../../components/FooterNav/FooterNav";
import Profile from "../../../components/Profile/Profile";
import data from '../../../data/patientDataSchedule.json';

const Schedule = () => {
  const [schedules, setSchedules] = useState([]);

  useEffect(() => {
    const fetchData = () => {
      setSchedules(data);
    };
    fetchData();
  }, []);

  if (schedules.length === 0) {
    return <div>Cargando...</div>;
  }

  return (
    <div className="max-w-lg mx-auto">
      <section className="p-4">
        <Profile
          icon_name="calendarOrange"
          greeting="Estos son tus turnos,"
          patientName="Laura!"
          photo="/Bung1.png"
        />
      </section>
      <section className="flex-1 flex-col space-y-[18px] px-4 py-4">
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
      <section className="pb-24 bg-[#CAD6FF]">
        <Calendar />
      </section>
      <section>
        <FooterNav />
      </section>
    </div>
  );
};

export default Schedule;
