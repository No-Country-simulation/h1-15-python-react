/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { postDoctorSchedule } from "../../services/doctorService";
import { showToast } from "../../utils/toast";
import { ToastContainer } from "react-toastify";
import { getEntities } from "../../services/entityService";
import { LocalizationProvider, TimePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
const daysOfWeek = [
  "domingo",
  "lunes",
  "martes",
  "miercoles",
  "jueves",
  "viernes",
  "sábado",
];
export default function AddNewDaySchedule({ setOpenModal }) {
  const [end, setEnd] = useState(null);
  const [init, setInit] = useState(null);
  const [entity, setEntity] = useState(null);
  const [day, setDay] = useState(null);
  const [entities, setEntities] = useState([]);

  useEffect(() => {
    getEntities().then((res) => setEntities(res));
  }, []);
  function saveProfessionalData(e) {
    e.preventDefault();

    if (init && end && day && entity) {
      postDoctorSchedule({
        entity: entity,
        schedules: [[day, init, end]],
      }).then(({ request }) => {
        if (request.status === 400) {
          showToast(JSON.parse(request.response).conflicts[0].error, "error");
        } else {
          setOpenModal(false);
          showToast("Se han guardado tus datos.");
          location.reload();
        }
      });
    } else {
      showToast("Quedan campos vacíos.", "error");
    }
  }
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <article className="flex absolute inset-0 backdrop-blur-sm backdrop-brightness-75 z-50">
        <ToastContainer />
        <div className="h-2/3 aspect-square bg-slate-50 m-auto rounded-lg flex flex-col gap-5 p-5">
          <h2 className="text-xl font-semibold text-center">
            Ingrese los siguientes datos para crear una disponibilidad
          </h2>
          <form onSubmit={saveProfessionalData} className="flex flex-col gap-5">
            <label className="flex flex-col  ">
              Establecimiento de atención
              <select
                defaultValue={0}
                name="entity"
                className="border p-2 rounded-lg"
                onChange={({ target }) => setEntity(target.value)}
              >
                <option value={0} disabled>
                  Elige una opción
                </option>
                {entities.map((item, index) => (
                  <option value={item.name} key={index}>
                    {item.name}
                  </option>
                ))}
              </select>
            </label>
            <label className="flex flex-col  ">
              Dia de atención
              <select
                defaultValue={0}
                name="day"
                className="border p-2 rounded-lg capitalize"
                onChange={({ target }) => setDay(target.value)}
              >
                <option value={0} disabled>
                  Elige una opción
                </option>
                {daysOfWeek.map((item, index) => (
                  <option className="capitalize" value={item} key={index}>
                    {item}
                  </option>
                ))}
              </select>
            </label>
            <div className="flex justify-center gap-5">
              <label className="flex flex-col w-full">
                Desde
                <TimePicker
                  ampm={false}
                  onChange={({ $H, $m }) => setInit(`${$H}:${$m}`)}
                />
              </label>
              <label className="flex flex-col w-full">
                Hasta
                <TimePicker
                  ampm={false}
                  onChange={({ $H, $m }) => setEnd(`${$H}:${$m}`)}
                />
              </label>
            </div>
            <div className="flex gap-5">
              <button
                type="submit"
                className="hover:cursor-pointer bg-magentaButton text-white p-2 rounded w-full"
              >
                Guardar
              </button>
              <button
                className="hover:cursor-pointer bg-slate-200 p-2 rounded w-full"
                onClick={() => setOpenModal(false)}
              >
                Omitir
              </button>
            </div>
          </form>
        </div>
      </article>
    </LocalizationProvider>
  );
}
