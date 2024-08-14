import { useEffect, useState } from "react";
import Calendar from "../../../components/Calendar";
import LateralView from "../../../components/LateralView";
import dayjs from "dayjs";
import weekday from "dayjs/plugin/weekday";
import "dayjs/locale/es";
import { capitalizar } from "../../../utils/Capitalize";
import DoctorTimeline from "../../../components/Doctor-timeline/DoctorTimeline";

const DoctorAppointments = () => {
  const [fecha, setFecha] = useState(new Date());
  const [selectedPatient, setSelectedPatient] = useState();
  const [showCalendar, setShowCalendar] = useState(false);

  dayjs.locale("es");
  dayjs().format();
  dayjs.extend(weekday);

  useEffect(() => {
    setSelectedPatient(undefined);
  }, [fecha]);

  return (
    <div className="flex justify-between gap-2">
      <section className="grid gap-2 h-fit relative w-2/3">
        <div className="flex gap-10 justify-between">
          <h1 className="font-semibold text-5xl font-josefin">Turnos</h1>
          <h4
            className="w-fit cursor-pointer text-center text-lg font-bold underline my-4 mr-10"
            onClick={() => {
              if ((selectedPatient !== undefined) | null) {
                setSelectedPatient(null);
              }
              setShowCalendar(!showCalendar);
            }}
          >
            {capitalizar(
              dayjs(fecha)
                .weekday(fecha.getDay() - 1)
                .format("dddd"),
            ) +
              ", " +
              fecha.toLocaleDateString()}
          </h4>
        </div>

        {/**LISTADO DE TURNOS DE LA FECHA SELECCIONADA */}
        <article className="">
          <DoctorTimeline
            day={fecha}
            setPatient={setSelectedPatient}
            selectedPatient={selectedPatient}
          />
        </article>
      </section>

      <LateralView paciente={selectedPatient} />
      <div
        className={`${
          showCalendar ? "opacity-100" : "absolute opacity-0 -z-20"
        } transition-opacity duration-500 easy-in-out bg-white border border-blue-600 shadow-md shadow-blue-700 rounded-lg mt-24`}
        onClick={() => {
          setShowCalendar(false);
          setSelectedPatient(null);
        }}
      >
        <Calendar fecha={setFecha} />
      </div>
    </div>
  );
};

export default DoctorAppointments;
