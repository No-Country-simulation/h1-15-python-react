import { Link } from "react-router-dom";
import Icon from "../Icon/Icon";

const FooterNav = () => {
  return (
    <div className="max-w-lg mx-auto fixed bottom-0 left-0 right-0 bg-Justina_1 text-white flex justify-around items-center px-[6px] shadow-lg z-50">
      <Link
        to="/patient/profile"
        className="p-4 hover:rounded-[10px] hover:bg-gray-200 hover:bg-opacity-20 transition-colors duration-300 cursor-pointer"
      >
        <Icon name="profile" />
      </Link>
      <Link
        to="/patient/doctor-information"
        className="p-4 hover:rounded-[10px] hover:bg-gray-200 hover:bg-opacity-20 transition-colors duration-300 cursor-pointer"
      >
        <Icon name="stethoscope" />
      </Link>
      <Link
        to="/patient"
        className="p-4 hover:rounded-[10px] hover:bg-gray-200 hover:bg-opacity-20 transition-colors duration-300 cursor-pointer"
      >
        <Icon name="home" />
      </Link>
      <Link
        to="/patient/treatment"
        className="p-4 hover:rounded-[10px] hover:bg-gray-200 hover:bg-opacity-20 transition-colors duration-300 cursor-pointer"
      >
        <Icon name="medicinewhite" />
      </Link>
      <Link
        to="/patient/schedule"
        className="p-4 hover:rounded-[10px] hover:bg-gray-200 hover:bg-opacity-20 transition-colors duration-300 cursor-pointer"
      >
        <Icon name="calendar" />
      </Link>
    </div>
  );
};

export default FooterNav;
