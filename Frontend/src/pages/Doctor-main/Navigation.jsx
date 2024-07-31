const Navegacion = () => {
  return (
    <aside className="flex flex-col min-w-[264px] bg-pink-300 text-black rounded-3xl py-8 px-5 h-screen fixed">
      <img className="w-20 h-10 self-center" src="/justinaLogo.png" alt="Logo" />
      <nav className="flex flex-col my-10 w-fit gap-10">
        <a href="/doctor">🏠 Inicio</a>
        <a href="/doctor/appointments">🗒️ Turnos</a>
        <a href="">💉 Tratamientos</a>
        <a href="/doctor/cross-transplant">💞 Trasplantes Cruzados</a>
      </nav>
      <nav className="flex flex-col my-10 w-fit gap-10 h-10">
        <a href="">⚙️ Configuración</a>
        <a href="">🛟 Ayuda</a>
      </nav>
    </aside>
  );
};

export default Navegacion;
