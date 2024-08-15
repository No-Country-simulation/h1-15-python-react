import FooterNav from "../../../components/FooterNav/FooterNav";
import LateralMenu from "../components/LateralMenu";
import MedicalHistoryForm from "./MedicalHistoryForm";

const HistoryMedical = () => {
  return (
    <div className="max-w-screen-lg mx-auto px-4">
      <LateralMenu />
      <section className="h-full pb-20">
        <MedicalHistoryForm />
      </section>
      <section>
        <FooterNav />
      </section>
    </div>
  );
};

export default HistoryMedical;
