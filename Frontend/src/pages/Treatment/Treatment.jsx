import CardEvent from "../../components/CardTitle/CardEvent";
import CardTitle from "../../components/CardTitle/CardTitle";
import FooterNav from "../../components/FooterNav/FooterNav";
import Profile from "../../components/Profile/Profile";

const Treatment = () => {
  return (
    <div className="max-w-lg mx-auto">
      <section className="p-4">
        <Profile />
        <h1 className="font-sans text-3xl font-light m-8 text-center">
          Buen día, Laura!
        </h1>
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
