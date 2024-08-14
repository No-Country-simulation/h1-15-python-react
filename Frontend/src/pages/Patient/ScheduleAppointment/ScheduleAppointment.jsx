import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { getDoctorDataAll } from "../../../services/doctorService";
import ScheduleAppointmentForm from "./ScheduleAppointmentForm";
import Spinner from "../../../components/Spinner";

function ScheduleAppointment() {
  const { id } = useParams();
  const [doctor, setDoctor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDoctorData = async () => {
      try {
        const doctorsData = await getDoctorDataAll();
        const selectedDoctor = doctorsData.find(
          (doc) => doc.id === parseInt(id)
        );
        setDoctor(selectedDoctor);
      } catch (error) {
        setError("No se pudo obtener la información del doctor.");
        console.error("Error al obtener los datos del doctor:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDoctorData();
  }, [id]);

  if (loading) {
    return <div><Spinner/></div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (!doctor) {
    return <div>No se encontró al doctor.</div>;
  }

  return (
    <div className="max-w-screen-lg mx-auto">
      <ScheduleAppointmentForm doctor={doctor} />
    </div>
  );
}

export default ScheduleAppointment;
