import CardPatientAttendance from "../../components/Cards/CardPatientAttendance";
import UserMenu from "../../components/UserMenu";

const DoctorMain = () => {
  return (
    <main className="flex w-full min-h-[1024px] p-5 gap-5">
      {/**MENU DE NAVEGACION */}
      <aside className="flex flex-col min-w-[264px] bg-pink-300 text-black rounded-3xl py-8 px-5 h-full">
        <img
          className="w-20 h-10 self-center"
          src="justinaLogo.png"
          alt="Logo"
        />
        <nav className="flex flex-col my-10 w-fit gap-10">
          <a href="">🏠 Inicio</a>
          <a href="">🗒️ Turnos</a>
          <a href="">💉 Tratamientos</a>
          <a href="">💞 Transplantes Cruzados</a>
        </nav>
        <nav className="flex flex-col my-10 w-fit gap-10 justify-self-end">
          <a href="">⚙️ Configuración</a>
          <a href="">🛟 Ayuda</a>
        </nav>
      </aside>
      {/**CONTENIDO PRINCIPAL */}
      <section className="min-w-[689px] grid grid-cols-2 gap-2">
        <article className="border border-blue-500 rounded-2xl ">
          {/**calendario */}
        </article>
        <article className="border border-blue-500 rounded-2xl ">
          {/**Novedades */}
        </article>
        <article className="border border-blue-500 rounded-2xl ">
          {/**Estadísticas */}
        </article>
      </section>
      {/**CONTENIDO LATERAL */}
      <section className="flex flex-col"></section>
      <aside className="flex flex-col items-center w-full">
        {/**NOTIFICACIONES */}
        <div className="flex gap-10 justify-center w-full">
          <div className="">⭕️</div>
          <div className="">🔔</div>
          <div>
            <UserMenu />
          </div>
        </div>
        <CardPatientAttendance />
      </aside>
    </main>
  );
};

export default DoctorMain;
