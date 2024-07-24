import CardEvent from "../../components/Cards/CardEvent";
import CardTitle from "../../components/Cards/CardTitle";
import FooterNav from "../../components/FooterNav/FooterNav";
import Profile from "../../components/Profile/Profile";
import SearchBar from "../../components/SearchBar/SearchBar";

const Treatment = () => {
  return (
    <div className="max-w-lg mx-auto">
      <section className="p-4">
        <SearchBar />
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
          />
        </div>
        <div className="w-1/2">
          <CardTitle
            titles={["Medicamentos Pendientes:", "3"]}
            backgroundColor="#D22B8B"
            textColor="#FFF"
          />
        </div>
      </section>
      <section className="grid">
        <CardEvent
          color="#D22B8B"
          eventAction="Nueva toma de"
          eventName="Ciclosporina 10mg"
          eventTime="8:30"
          eventTimeUnit="AM"
        />
        <CardEvent
          color="#6ED1AF"
          eventAction="Turno médico con"
          eventName="Doctor Chang"
          eventTime="8:30"
          eventTimeUnit="PM"
        />
        <CardEvent
          color="#D22B8B"
          eventAction="Nueva toma de"
          eventName="Ciclosporina 10mg"
          eventTime="8:30"
          eventTimeUnit="AM"
        />
        <CardEvent
          color="#6ED1AF"
          eventAction="Turno médico con"
          eventName="Doctor Chang"
          eventTime="8:30"
          eventTimeUnit="PM"
        />
        <CardEvent
          color="#6ED1AF"
          eventAction="Turno médico con"
          eventName="Doctor Chang"
          eventTime="8:30"
          eventTimeUnit="PM"
        />
        <CardEvent
          color="#6ED1AF"
          eventAction="Turno médico con"
          eventName="Doctor Chang"
          eventTime="8:30"
          eventTimeUnit="PM"
        />
        <CardEvent
          color="#6ED1AF"
          eventAction="Turno médico con"
          eventName="Doctor Chang"
          eventTime="8:30"
          eventTimeUnit="PM"
        />
        <CardEvent
          color="#6ED1AF"
          eventAction="Turno médico con"
          eventName="Doctor Chang"
          eventTime="8:30"
          eventTimeUnit="PM"
        />
      </section>
      <section>
        <FooterNav />
      </section>
    </div>
  );
};

export default Treatment;
