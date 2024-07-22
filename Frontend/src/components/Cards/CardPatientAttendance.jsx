import Avatar from "./../Avatar";
const CardPatientAttendance = () => {
  return (
    <div className="my-10 flex flex-col">
      <div className="bg-yellow-300 text-black rounded-3xl w-full py-4 text-sm text-center">
        Este paciente está diagnosticado con <i>Arritmia</i>.
        <br />
        Su nivel de riesgo es <b>Alto</b>
      </div>
      {/* CONECTOR */}
      <div className="bg-yellow-300 w-full flex gap-10 h-5">
        <div className="bg-white w-1/2 h-5 rounded-r-xl"></div>
        <div className="bg-white w-1/2 h-5 rounded-l-xl"></div>
      </div>
      {/**FIN CONECTOR */}
      <div className="bg-yellow-300 rounded-3xl p-3 flex justify-center items-stretch flex-col">
        <div className="flex justify-around">
          <Avatar
            className={"w-20 h-20 mt-0 self-center"}
            imagen={"Profile1.png"}
          />
          <div className="flex flex-col">
            <p className="font-bold ">🟠 En consulta</p>
            <p className="text-xl">Jonah Makarov</p>
            <p className="font-light text-sm">
              Edad: <span>15</span> años
            </p>
            <div className="w-full h-[1px] bg-slate-400 my-3"></div>
            <p>Dr Cardiologo</p>
            <p className="font-semibold text-sm">Cardiología</p>
          </div>
        </div>

        <div className="bg-red-500 rounded-3xl p-4 flex flex-col relative text-base min-h-36 mt-5 text-white">
          <p>
            Ultimo diagnóstico: <i>Arritmia</i>
          </p>
          <p>
            Visitas: <strong>10</strong>
          </p>
          <p className="w-36">
            Ultimo Reporte: <a href="">Aqui</a>
          </p>
          <button className="bg-black hover:bg-slate-500 hover:text-black text-yellow-400 text-xs absolute bottom-3 right-3 p-3 rounded-3xl ">
            Detalles...
          </button>
        </div>
      </div>
    </div>
  );
};

export default CardPatientAttendance;
