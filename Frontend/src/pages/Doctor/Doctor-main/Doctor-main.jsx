import { useState } from "react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/autoplay";
import LateralView from "../../../components/LateralView";
import DoctorTimeline from "../../../components/Doctor-timeline/DoctorTimeline";
import "./styles.css";

const DoctorMain = () => {
  const [patient, setPatient] = useState(null);

  return (
    <div className="flex font-josefin">
      <section className="w-full grid grid-cols-7 gap-2 h-fit">
        <section className="col-start-1 col-end-6 max-h-[85dvh] overflow-y-scroll scrollbar-hide">
          <div className="flex relative">
            <h1 className="font-semibold text-5xl font-josefin">
              Turnos de hoy {new Date().toLocaleDateString()}
            </h1>
          </div>
          <DoctorTimeline setPatient={setPatient} />
        </section>
        <section className="col-start-6 col-end-8 px-2">
          {patient && <LateralView paciente={patient} />}
        </section>
      </section>
    </div>
  );
};

export default DoctorMain;
