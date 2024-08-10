import FooterNav from "../../../components/FooterNav/FooterNav";
import PageConstruction from "../../../components/PageConstruction/PageConstruction";
import LateralMenu from "../components/LateralMenu";

const HistoryMedical = () => {
  return (
    <div className="max-w-screen-lg mx-auto px-4">
      <LateralMenu/>
      <section>
        <PageConstruction />
      </section>
      <section>
        <FooterNav />
      </section>
    </div>
  );
};

export default HistoryMedical;
