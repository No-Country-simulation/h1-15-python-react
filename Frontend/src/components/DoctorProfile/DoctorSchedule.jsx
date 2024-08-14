/* eslint-disable react/prop-types */
import { useState } from "react";
import AddNewDaySchedule from "./AddNewDaySchedule";

export default function DoctorSchedule({ schedule }) {
  const [openModal, setOpenModal] = useState(false);
  return (
    <section className="pt-4 flex flex-col gap-5">
      <div className="flex gap-5 items-center">
        <h2 className="text-xl text-slate-500">Horarios de atención</h2>
        <button
          className="hover:cursor-pointer bg-slate-200 p-1 rounded"
          onClick={() => setOpenModal(true)}
        >
          Nuevos horarios
        </button>
      </div>
      <div className="flex gap-5 flex-wrap">
        {Object.entries(schedule).map(([prop, value], index) => (
          <div className="flex flex-col gap-5" key={index}>
            <b>{prop}</b>
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
      {openModal && <AddNewDaySchedule setOpenModal={setOpenModal} />}
    </section>
  );
}
