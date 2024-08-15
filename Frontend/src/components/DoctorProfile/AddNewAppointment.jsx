/* eslint-disable react/prop-types */
import { postDoctorAppointment } from "../../services/doctorService";
import { showToast } from "../../utils/toast";
import { ToastContainer } from "react-toastify";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { useState } from "react";

export default function AddNewAppointment({ setOpenModal, content }) {
  const [end, setEnd] = useState(null);
  const [init, setInit] = useState(null);
  function saveProfessionalData(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const appointment_duration = formData.get("appointment_duration");
    if (appointment_duration && init && end) {
      const dateInit = init.$d.toISOString().split("T")[0];
      const dateEnd = end.$d.toISOString().split("T")[0];
      postDoctorAppointment({
        entity: content.entity,
        appointment_duration,
        date_init: dateInit,
        date_end: dateEnd,
      }).then(() => {
        showToast("Se han guardado tus datos.");
        setOpenModal(false);
      });
    } else {
      showToast("Quedan campos vacíos.", "error");
    }
  }
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <article className="flex absolute inset-0 backdrop-blur-sm backdrop-brightness-75 z-50">
        <ToastContainer />
        <div className="h-fit bg-slate-50 m-auto rounded-lg flex flex-col gap-5 p-5 max-w-[90%] sm:max-w-[50%]">
          <h2 className="text-xl font-semibold text-center">
            Configura de los turnos para {content.entity}
          </h2>
          <p>
            Completa los campos y se crearan turnos de los minutos que elija, en
            los días que haya creado disponibilidad, dentro del rango de fechas
            seleccionadas.
          </p>
          <form onSubmit={saveProfessionalData} className="flex flex-col gap-5">
            <label>
              Elige de cuantos minutos sera cada turno.
              <input
                // required
                placeholder="15"
                type="text"
                name="appointment_duration"
                className="border rounded-lg w-full px-3 py-1"
              />
            </label>
            <div className="flex gap-5">
              <label className="flex flex-col w-full">
                Desde
                <DatePicker
                  onChange={(value) => setInit(value)}
                  format="YYYY-MM-DD"
                />
              </label>
              <label className="flex flex-col w-full">
                hasta
                <DatePicker
                  onChange={(value) => setEnd(value)}
                  format="YYYY-MM-DD"
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
