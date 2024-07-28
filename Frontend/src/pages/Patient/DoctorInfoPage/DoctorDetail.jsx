import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import doctorsData from "../../../data/patientDataDoctors.json";
import FooterNav from "../../../components/FooterNav/FooterNav";
import BackButton from "../../../components/BackButton/BackButton";

function DoctorDetail() {
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
    <main className="max-w-md mx-auto p-4"> 
    <BackButton/>
    <section className="pb-20">
      <img
        src={doctor.photo}
        alt={doctor.name}
        className="w-32 h-32 rounded-full mx-auto mb-4"
      />
      <h1 className="text-2xl font-bold text-center">{doctor.name}</h1>
      <p className="text-center text-gray-600">{doctor.specialty}</p>
      <div className="text-center mt-2">
        <span className="font-semibold">{doctor.rating}</span> ★
      </div>
      <p className="text-center mt-2">Reseñas: {doctor.reviews}</p>

      <div className="mt-4">
        <h2 className="text-lg font-semibold">Sobre el especialista</h2>
        <p className="mt-2">{doctor.description}</p>
        <p className="mt-2 font-semibold">Horario de atención:</p>
        <p>{doctor.schedule}</p>
      </div>

      <div className="mt-4">
        <h2 className="text-lg font-semibold">Contacto</h2>
        <a
          href={`https://wa.me/${doctor.whatsapp}`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-500 underline"
        >
          Chat Directo
        </a>
      </div>

      <button className="mt-4 bg-blue-500 text-white py-2 px-4 rounded">
        Ver Calendario y Agendar Cita
      </button>
    </section>
    <section>
      <FooterNav/>
    </section>
    </main>

  );
}

export default DoctorDetail;
