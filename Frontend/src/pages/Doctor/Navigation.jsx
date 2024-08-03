import { MdOutlineHome } from "react-icons/md";
import { BiChat } from "react-icons/bi";
import { RiMedicineBottleLine } from "react-icons/ri";
import { TbHearts } from "react-icons/tb";
import { IoSettingsOutline } from "react-icons/io5";
import { CiCalendar } from "react-icons/ci";
import { Link } from "react-router-dom";

const Navigation = () => {
  return (
    <aside className="flex flex-col w-[264px] bg-secondary-600 text-white font-semibold rounded-3xl h-full min-h-[90dvh] overflow-hidden pt-4">
      <img className="self-center w-1/2" src="/justinaLogo.png" alt="Logo" />
      <nav className="flex flex-col w-full min-h-full gap-2 flex-grow py-4 ">
        <Link
          to="/doctor"
          className="flex text-base items-center gap-2 hover:bg-secondary-400 w-full p-3"
        >
          <MdOutlineHome />
          Inicio
        </Link>
        <Link
          to="/"
          className="flex text-base items-center gap-2 hover:bg-secondary-400 w-full p-3"
        >
          <BiChat />
          Mensajes
        </Link>
        <Link
          to="/"
          className="flex text-base items-center gap-2 hover:bg-secondary-400 w-full p-3"
        >
          <RiMedicineBottleLine />
          Tratamientos
        </Link>
        <Link
          to="transplants"
          className="flex text-base items-center gap-2 hover:bg-secondary-400 w-full p-3"
        >
          <TbHearts />
          Trasplantes Cruzados
        </Link>
        <Link
          to="appointments"
          className="flex text-base items-center gap-2 hover:bg-secondary-400 w-full p-3"
        >
          <CiCalendar />
          Calendario
        </Link>
        <Link
          to="/"
          className="flex text-base items-center gap-2 hover:bg-secondary-400 w-full p-3 mt-auto"
        >
          <IoSettingsOutline />
          Configuraciones
        </Link>
      </nav>
    </aside>
  );
};

export default Navigation;
