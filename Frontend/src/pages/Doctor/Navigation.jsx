import { MdOutlineHome } from "react-icons/md";
import { BiChat } from "react-icons/bi";
import { RiMedicineBottleLine } from "react-icons/ri";
import { TbHearts } from "react-icons/tb";
import { IoSettingsOutline } from "react-icons/io5";
import { CiCalendar } from "react-icons/ci";
import { Link } from "react-router-dom";

const Navigation = () => {
  return (
    <aside className="flex flex-col min-w-[264px] bg-secondary-600 text-white font-semibold rounded-3xl h-full min-h-[90dvh] overflow-hidden pt-4">
      <img
        className="w-20 h-10 self-center"
        src="/justinaLogo.png"
        alt="Logo"
      />
      <nav className="flex flex-col w-full min-h-full gap-2 flex-grow pb-4 ">
        <Link
          to="/doctor"
          className="flex text-base items-center gap-2 hover:bg-secondary-400 w-full px-4 py-1"
        >
          <MdOutlineHome />
          Inicio
        </Link>
        <Link
          href="/"
          className="flex text-base items-center gap-2 hover:bg-secondary-400 w-full px-4 py-1"
        >
          <BiChat />
          Mensajes
        </Link>
        <Link
          to="/"
          className="flex text-base items-center gap-2 hover:bg-secondary-400 w-full px-4 py-1"
        >
          <RiMedicineBottleLine />
          Tratamientos
        </Link>
        <Link
          to="/"
          className="flex text-base items-center gap-2 hover:bg-secondary-400 w-full px-4 py-1"
        >
          <TbHearts />
          Transplantes Cruzados
        </Link>
        <Link
          to="appointments"
          className="flex text-base items-center gap-2 hover:bg-secondary-400 w-full px-4 py-1"
        >
          <CiCalendar />
          Calendario
        </Link>
        <Link
          to="/"
          className="flex text-base items-center gap-2 hover:bg-secondary-400 w-full px-4 py-1 mt-auto"
        >
          <IoSettingsOutline />
          Configuraciones
        </Link>
      </nav>
    </aside>
  );
};

export default Navigation;
