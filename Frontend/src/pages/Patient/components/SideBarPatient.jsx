import { Link } from "react-router-dom";

const SideBarPatient = () => {
  return (
    <aside className="absolute w-64 h-screen bg-white text-gray-800 p-4">
      <nav className="flex flex-col space-y-4">
        <Link
          to="/patient"
          className="flex items-center space-x-2  p-2 rounded "
        >
          <span>Inicio</span>
        </Link>
        <Link
          to="/patient/schedule"
          className="flex items-center space-x-2  p-2 rounded "
        >
          <span>Próximos Turnos</span>
        </Link> 
        <div className="flex flex-col space-y-2">
          <button className="flex items-center space-x-2  p-2 rounded w-full text-left">
            <span>Tratamiento</span>
          </button>
          <div className="pl-4 space-y-1">
            <Link
              to="/patient/treatment"
              className=" p-2 rounded block"
            >
              Medicación
            </Link>
            <Link
              to="/tratamiento/nutricion"
              className=" p-2 rounded block"
            >
              Nutrición
            </Link>
            <Link
              to="/tratamiento/actividad-fisica"
              className=" p-2 rounded block"
            >
              Actividad Física
            </Link>
          </div>
        </div>
        <Link
          to="/prepaga"
          className="flex items-center space-x-2  p-2 rounded "
        >
          <span>Prepaga</span>
        </Link>
        <Link
          to="/patient/profile"
          className="flex items-center space-x-2  p-2 rounded  "
        >
          <span>Perfil</span>
        </Link>
        <Link
          to="/patient/emergency-contacts"
          className="flex items-center space-x-2  p-2 rounded "
        >
          <span>Contactos de Emergencia</span>
        </Link>
        <Link
          to="/configuracion"
          className="flex items-center space-x-2  p-2 rounded "
        >
          <span>Configuración</span>
        </Link>
        <button className="w-full bg-magentaButton p-2 rounded text-white">
          Cerrar Sesión
        </button>
      </nav>
    </aside>
  );
};

export default SideBarPatient;
