import FooterNav from "../../../components/FooterNav/FooterNav";
import EmergencyContacts from "./EmergencyContacts";

const Emergency = () => {
  return (
    <div className="max-w-screen-lg mx-auto">
      <section className="mb-20">
        <EmergencyContacts />
      </section>
      <section>
        <FooterNav />
      </section>
    </div>
  );
};

export default Emergency;
