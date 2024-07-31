import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import doctorsData from "../../../data/patientDataDoctors.json";
import FooterNav from "../../../components/FooterNav/FooterNav";
import BackButton from "../../../components/BackButton/BackButton";
import ContactItem from "./ContactItem";

function DoctorDetail() {
  const { id } = useParams();
  const [doctor, setDoctor] = useState(null);
  const navigate = useNavigate(); 

  useEffect(() => {
    const selectedDoctor = doctorsData.find((doc) => doc.id === parseInt(id));
    setDoctor(selectedDoctor);
  }, [id]);

  if (!doctor) {
    return <div>No se encontró al doctor.</div>;
  }

  const handleScheduleClick = () => {
    navigate(`/schedule-appointment/${id}`);
  };

  return (
    <main className="max-w-md mx-auto p-4">
      <BackButton />
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
          <p className="mt-2 font-semibold mb-4">Horario de atención:</p>
          {Object.entries(doctor.schedule).map(([day, hours]) => (
            <p key={day}>
              <span className="font-semibold">{day}: </span>
              <span>{hours[0]} - {hours[1]}</span>
            </p>
          ))}
        </div>

        <div className="mt-4">
          <h2 className="text-lg font-semibold pb-4">Contacto</h2>
          <div className="grid gap-4">
            <ContactItem
              href={`https://wa.me/${doctor.whatsapp}`}
              icon="chat"
              title="Chat Directo"
              description="Escribe mensajes, comparte fotos."
            />
            <ContactItem
              href={`https://wa.me/${doctor.whatsapp}`}
              icon="whatsapp"
              title="WhatsApp"
              description="Llama a tu médico."
            />
          </div>
        </div>
        <div className="flex justify-center">
          <button
            onClick={handleScheduleClick}
            className="mt-4 bg-Justina_8 text-white py-2 px-4 rounded"
          >
            Agendar una cita
          </button>
        </div>
      </section>
      <FooterNav />
    </main>
  );
}

export default DoctorDetail;
