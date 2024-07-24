import Calendar from "../../components/Calendar/Calendar";
import CardSchedule from "../../components/Cards/CardSchedule";
import FooterNav from "../../components/FooterNav/FooterNav";
import Profile from "../../components/Profile/Profile";
import SearchBar from "../../components/SearchBar/SearchBar";

const Schedule = () => {
  return (
    <div className="max-w-lg mx-auto">
      <section className="p-4">
        <SearchBar />
        <Profile
          icon_name="calendarOrange"
          greeting="Estos son tus turnos, Laura"
        />
      </section>
      <section className="flex-1 flex-col space-y-[18px] px-4 py-4">
        <CardSchedule
          profileImage="./doc1.png"
          name="Dr. Olivia Turner, M.D."
          specialty="Endocrinologa"
          date="Mie, 26 Julio"
          timeRange="9:30 AM - 10:00 AM"
        />
        <CardSchedule
          profileImage="./doc2.png"
          name="Dr. Alexander Bennett, Ph.D."
          specialty="Cirujano"
          date="Jue, 27 Julio"
          timeRange="10:00 AM - 12:00 PM"
        />
        <CardSchedule
          profileImage="./doc1.png"
          name="Dr. Olivia Turner, M.D."
          specialty="Endocrinologa"
          date="Jue, 27 Julio"
          timeRange="9:30 AM - 10:00 AM"
        />
        <CardSchedule
          profileImage="./doc2.png"
          name="Dr. Alexander Bennett, Ph.D."
          specialty="Cirujano"
          date="Vie, 28 Julio"
          timeRange="10:00 AM - 12:00 PM"
        />
      </section>
      <section className="pb-24 bg-[#CAD6FF]">
      <Calendar/>
      </section>
      <section>
        <FooterNav />
      </section>
    </div>
  );
};

export default Schedule;
