import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import doctorsData from "../../../data/patientDataDoctors.json";
import ScheduleAppointmentForm from "./ScheduleAppointmentForm";

function ScheduleAppointment() {
  const { id } = useParams();
  const [doctor, setDoctor] = useState(null);

  useEffect(() => {
    const selectedDoctor = doctorsData.find((doc) => doc.id === parseInt(id));
    setDoctor(selectedDoctor);
  }, [id]);

  if (!doctor) {
    return <div>No se encontró al doctor.</div>;
  }

  return (
    <div className="max-w-lg mx-auto">
      <ScheduleAppointmentForm doctor={doctor} />
    </div>
  );
}

export default ScheduleAppointment;
