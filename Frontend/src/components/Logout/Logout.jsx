import { useNavigate } from "react-router-dom";
import useLanguage from "../../hooks/useLanguage";

const Logout = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    navigate("/");
  };

  const languageData = useLanguage();

  if (!languageData) {
    return <div>Cargando datos...</div>;
  }

  return (
    <button
      onClick={handleLogout}
      className="w-[90px] px-4 py-2 text-sm font-medium text-white bg-magentaButton rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-400"
    >
      {languageData.Navbar.title}
    </button>
  );
};

export default Logout;
