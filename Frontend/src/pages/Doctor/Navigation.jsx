import { Link, useLocation } from "react-router-dom";
import { Tooltip } from "@mui/material";
import Icon from "../../components/Icon/Icon";

const Navigation = () => {
  const actual = useLocation();

  return (
    <aside className="flex flex-col w-[264px] text-white font-semibold h-full min-h-[90dvh] overflow-hidden pt-4">
      <img className="self-center w-[75%]" src="/justinaLogo.webp" alt="Logo" />
      <nav className="flex flex-col bg-secondary-600 w-full min-h-full gap-2 flex-grow py-4 rounded-lg mt-4">
        <Link
          to="/doctor"
          className={`flex text-base items-center gap-2 hover:bg-secondary-400 w-full p-2 ${actual.pathname === "/doctor" ? "bg-secondary-500" : ""}`}
        >
          <Icon name="MdOutlineHomeIcon" />
          Inicio
        </Link>
        <Link
          to="patients"
          className={`flex text-base items-center gap-2 hover:bg-secondary-400 w-full p-2 ${actual.pathname === "/doctor/patients" ? "bg-secondary-500" : ""}`}
        >
          <Icon name="SlPeople" />
          Pacientes
        </Link>
        <Link
          to="messages"
          className={`flex text-base items-center gap-2 hover:bg-secondary-400 w-full p-2 ${actual.pathname === "/doctor/messages" ? "bg-secondary-500" : ""}`}
        >
          <Icon name="BichatIcon" />
          Mensajes
        </Link>
        <Link
          to="treatments"
          className={`flex text-base items-center gap-2 hover:bg-secondary-400 w-full p-2 ${actual.pathname === "/doctor/treatments" ? "bg-secondary-500" : ""}`}
        >
          <Icon name="RiMedicineBottleLine" />
          Tratamientos
        </Link>
        <Link
          to="transplants"
          className={`flex text-base items-center gap-2 hover:bg-secondary-400 w-full p-2 ${actual.pathname === "/doctor/transplants" ? "bg-secondary-500" : ""}`}
        >
          <Icon name="TbHearts" />
          Trasplantes Cruzados
        </Link>
        <Link
          to="appointments"
          className={`flex text-base items-center gap-2 hover:bg-secondary-400 w-full p-2 ${actual.pathname === "/doctor/appointments" ? "bg-secondary-500" : ""}`}
        >
          <Icon name="CiCalendar" />
          Calendario
        </Link>
        <Tooltip title="Proximamente...">
          <p className="flex text-base items-center gap-2 hover:bg-secondary-400 w-full p-3 mt-auto select-none cursor-pointer">
            <Icon name="IoSettingsOutline" />
            Configuraciones
          </p>
        </Tooltip>
      </nav>
    </aside>
  );
};

export default Navigation;
