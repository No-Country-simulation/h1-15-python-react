/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import AddNewDaySchedule from "./AddNewDaySchedule";
import Icon from "../Icon/Icon";
import AddNewAppointment from "./AddNewAppointment";

export default function DoctorSchedule({ schedule }) {
  const [openModalAvailability, setOpenModalAvailability] = useState(false);
  const [openModalAppointment, setOpenModalAppointment] = useState(false);
  const [ModalAppointmentContent, setModalAppointmentContent] = useState({
    entity: "",
  });

  useEffect(() => {
    window.scrollTo({
      top: 0,
    });
  }, [openModalAvailability, openModalAppointment]);
  return (
    <section className="pt-4 flex flex-col gap-5">
      <div className="flex gap-5 items-center">
        <h2 className="text-xl text-slate-500">Horarios de atención</h2>
        <button
          className="hover:cursor-pointer bg-slate-200 p-1 rounded"
          onClick={() => setOpenModalAvailability(true)}
        >
          Nuevos horarios
        </button>
      </div>
      <div className="flex gap-5 flex-wrap">
        {Object.entries(schedule).map(([prop, value], index) => (
          <div className="flex flex-col gap-5" key={index}>
            <div className="flex gap-3 items-center">
              <b className="text-lg">{prop}</b>
              <span
                className="w-5 hover:opacity-50 cursor-pointer"
                onClick={() => {
                  setOpenModalAppointment(true);
                  setModalAppointmentContent({ entity: prop });
                }}
              >
                <Icon name={"EditPen"} />
              </span>
            </div>
            <div className="flex flex-col px-4 w-fit gap-5">
              {Object.entries(value).map(([day, valueDay], index) => (
                <p key={index}>
                  {day}: <b>{valueDay[0][0]}</b> - <b>{valueDay[0][1]}</b>
                </p>
              ))}
            </div>
          </div>
        ))}
      </div>
      {openModalAvailability && (
        <AddNewDaySchedule setOpenModal={setOpenModalAvailability} />
      )}
      {openModalAppointment && (
        <AddNewAppointment
          setOpenModal={setOpenModalAppointment}
          content={ModalAppointmentContent}
        />
      )}
    </section>
  );
}
