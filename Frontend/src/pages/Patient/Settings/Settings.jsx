import FooterNav from "../../../components/FooterNav/FooterNav";
import LateralMenu from "../components/LateralMenu";
import SettingsPanel from "./SettingsPanel";

const Settings = () => {
  return (
    <div className="max-w-screen-lg mx-auto px-2">
      <LateralMenu />
      <section>
        <SettingsPanel />
      </section>
      <section>
        <FooterNav />
      </section>
    </div>
  );
};

export default Settings;
