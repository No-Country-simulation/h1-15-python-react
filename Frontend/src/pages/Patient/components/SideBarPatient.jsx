import { Link, useNavigate } from "react-router-dom";
import { logout } from "../../../services/auth";
import useLanguage from "../../../hooks/useLanguage";

const SideBarPatient = () => {
  const navigate = useNavigate();
  const languageData = useLanguage();

  const handleLogout = () => {
    logout(navigate);
  };

  if (!languageData) {
    return <div>Cargando datos...</div>;
  }

  return (
    <aside className="absolute w-64 h-screen bg-Justina_1 text-white p-4">
      <nav className="flex flex-col space-y-4">
        <Link
          to="/patient"
          className="flex items-center space-x-2  p-2 rounded "
        >
          <span>{languageData.lateralMenu.home}</span>
        </Link>
        <Link
          to="/patient/schedule"
          className="flex items-center space-x-2  p-2 rounded "
        >
          <span>{languageData.lateralMenu.upcoming_appointments}</span>
        </Link>
        <div className="flex flex-col space-y-2">
          <button className="flex items-center space-x-2  p-2 rounded w-full text-left">
            <span>{languageData.lateralMenu.treatment}</span>
          </button>
          <div className="pl-4 space-y-1">
            <Link to="/patient/treatment" className=" p-2 rounded block">
              {languageData.lateralMenu.medication}
            </Link>
            <Link to="/patient/nutrition" className=" p-2 rounded block">
              {languageData.lateralMenu.nutrition}
            </Link>
            <Link
              to="/patient/physical-activity"
              className=" p-2 rounded block"
            >
              {languageData.lateralMenu.physical_activity}
            </Link>
          </div>
        </div>
        <Link
          to="/patient/insurance"
          className="flex items-center space-x-2  p-2 rounded "
        >
          <span>{languageData.lateralMenu.insurance}</span>
        </Link>
        <Link
          to="/patient/profile"
          className="flex items-center space-x-2  p-2 rounded  "
        >
          <span>{languageData.lateralMenu.profile}</span>
        </Link>
        <Link
          to="/patient/emergency-contacts"
          className="flex items-center space-x-2  p-2 rounded "
        >
          <span>{languageData.lateralMenu.emergency_contacts}</span>
        </Link>
        <Link
          to="/patient/settings"
          className="flex items-center space-x-2  p-2 rounded "
        >
          <span>{languageData.lateralMenu.settings}</span>
        </Link>
        <button
          className="w-full bg-magentaButton p-2 rounded text-white"
          onClick={handleLogout}
        >
          {languageData.lateralMenu.logout}
        </button>
      </nav>
    </aside>
  );
};

export default SideBarPatient;
