import FooterNav from "../../../components/FooterNav/FooterNav";
import LateralMenu from "../components/LateralMenu";
import EmergencyContacts from "./EmergencyContacts";

const Emergency = () => {
  return (
    <div className="max-w-screen-lg mx-auto px-4">
      <LateralMenu />
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
