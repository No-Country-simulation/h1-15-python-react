import FooterNav from "../../../components/FooterNav/FooterNav";
import LateralMenu from "../components/LateralMenu";
import SupportCommunityCard from "./SupportCommunityCard";

const SupportComunity = () => {
  return (
    <div className="max-w-screen-lg mx-auto px-2">
      <LateralMenu />
      <section className="pb-20">
        <SupportCommunityCard />
      </section>
      <section>
        <FooterNav />
      </section>
    </div>
  );
};

export default SupportComunity;
