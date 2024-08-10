import FooterNav from "../../../components/FooterNav/FooterNav";
import PageConstruction from "../../../components/PageConstruction/PageConstruction";
import LateralMenu from "../components/LateralMenu";

const Insurance = () => {
  return (
    <div className="max-w-screen-lg mx-auto px-2">
      <LateralMenu />
      <section>
        <PageConstruction />
      </section>
      <section>
        <FooterNav />
      </section>
    </div>
  );
};

export default Insurance;
