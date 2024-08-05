import { MdOutlineHome } from "react-icons/md";
import { BiChat } from "react-icons/bi";
import { RiMedicineBottleLine } from "react-icons/ri";
import { TbHearts } from "react-icons/tb";
import { IoSettingsOutline } from "react-icons/io5";
import { CiCalendar } from "react-icons/ci";
import { Link, useLocation } from "react-router-dom";
import { SlPeople } from "react-icons/sl";
import { Tooltip } from "@mui/material";

const Navigation = () => {
  const actual = useLocation();

  return (
    <aside className="flex flex-col w-[264px]  text-white font-semibold h-full min-h-[90dvh] overflow-hidden pt-4">
      <img className="self-center w-[75%]" src="/justinaLogo.png" alt="Logo" />
      <nav className="flex flex-col bg-secondary-600 w-full min-h-full gap-2 flex-grow py-4 rounded-lg mt-4">
        <Link
          to="/doctor"
          className={`flex text-base items-center gap-2 hover:bg-secondary-400 w-full p-2 ${actual.pathname === "/doctor" ? "bg-secondary-500" : ""}`}
        >
          <MdOutlineHome />
          Inicio
        </Link>
        <Link
          to="patients"
          className={`flex text-base items-center gap-2 hover:bg-secondary-400 w-full p-2 ${actual.pathname === "/doctor/patients" ? "bg-secondary-500" : ""}`}
        >
          <SlPeople />
          Pacientes
        </Link>
        <Link
          to="messages"
          className={`flex text-base items-center gap-2 hover:bg-secondary-400 w-full p-2 ${actual.pathname === "/doctor/messages" ? "bg-secondary-500" : ""}`}
        >
          <BiChat />
          Mensajes
        </Link>
        <Link
          to="treatments"
          className={`flex text-base items-center gap-2 hover:bg-secondary-400 w-full p-2 ${actual.pathname === "/doctor/treatments" ? "bg-secondary-500" : ""}`}
        >
          <RiMedicineBottleLine />
          Tratamientos
        </Link>
        <Link
          to="transplants"
          className={`flex text-base items-center gap-2 hover:bg-secondary-400 w-full p-2 ${actual.pathname === "/doctor/transplants" ? "bg-secondary-500" : ""}`}
        >
          <TbHearts />
          Trasplantes Cruzados
        </Link>
        <Link
          to="appointments"
          className={`flex text-base items-center gap-2 hover:bg-secondary-400 w-full p-2 ${actual.pathname === "/doctor/messages" ? "bg-secondary-500" : ""}`}
        >
          <CiCalendar />
          Calendario
        </Link>
        <Tooltip title="Proximamente...">
          <p
            to="/"
            className="flex text-base items-center gap-2 hover:bg-secondary-400 w-full p-3 mt-auto select-none cursor-pointer"
          >
            <IoSettingsOutline />
            Configuraciones
          </p>
        </Tooltip>
      </nav>
    </aside>
  );
};

export default Navigation;
