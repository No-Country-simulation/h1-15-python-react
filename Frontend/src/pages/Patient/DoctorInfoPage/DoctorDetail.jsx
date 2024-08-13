import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getDoctorDataAll } from "../../../services/doctorService";
import FooterNav from "../../../components/FooterNav/FooterNav";
import BackButton from "../../../components/BackButton/BackButton";
import ContactItem from "./ContactItem";

function DoctorDetail() {
  const { id } = useParams();
  const [doctor, setDoctor] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDoctorData = async () => {
      try {
        const doctorsData = await getDoctorDataAll();
        const selectedDoctor = doctorsData.find((doc) => doc.id === parseInt(id));
        setDoctor(selectedDoctor);
      } catch (error) {
        console.error('Error al obtener los datos del doctor:', error);
      }
    };

    fetchDoctorData();
  }, [id]);

  if (!doctor) {
    return <div>No se encontró al doctor.</div>;
  }

  // Extraer los datos necesarios
  const {
    user: { first_name, last_name },
    specialty,
    medical_license,
    consultation_phone,
    whatsapp,
    reviews,
    rating,
    schedule
  } = doctor;

  const handleScheduleClick = () => {
    navigate(`/patient/schedule/appointment/${id}`);
  };

  return (
    <main className="max-w-screen-lg mx-auto p-4">
      <BackButton />
      <section className="pb-20">
        <img
          src={`https://via.placeholder.com/150?text=${first_name[0]}${last_name[0]}`}
          alt={first_name}
          className="w-32 h-32 md:w-48 md:h-48 lg:w-56 lg:h-56 rounded-full mx-auto mb-4"
        />
        <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-center">
          {first_name} {last_name}
        </h1>
        <p className="text-center text-gray-600 text-base md:text-lg">
          {specialty}
        </p>
        <div className="text-center mt-2">
          <span className="font-semibold text-lg md:text-xl">
            {rating || 'N/A'}
          </span>{" "}
          ★
        </div>
        <p className="text-center mt-2 text-base md:text-lg">
          Reseñas: {reviews}
        </p>

        <div className="mt-4">
          <h2 className="text-lg md:text-xl lg:text-2xl font-semibold">
            Sobre el especialista
          </h2>
          <p className="mt-2 text-base md:text-lg">Licencia Médica: {medical_license}</p>
          <p className="mt-2 text-base md:text-lg">Teléfono de consulta: {consultation_phone}</p>
          <p className="mt-2 text-base md:text-lg">WhatsApp: {whatsapp}</p>
          {Object.entries(schedule).length > 0 && (
            <>
              <p className="mt-2 font-semibold mb-4 text-base md:text-lg">
                Horario de atención:
              </p>
              {Object.entries(schedule).map(([day, hours]) => (
                <p key={day} className="text-base md:text-lg">
                  <span className="font-semibold">{day}: </span>
                  <span>
                    {hours[0]} - {hours[1]}
                  </span>
                </p>
              ))}
            </>
          )}
        </div>

        <div className="mt-4">
          <h2 className="text-lg md:text-xl lg:text-2xl font-semibold pb-4">
            Contacto
          </h2>
          <div className="grid gap-4">
            <ContactItem
              href={`https://wa.me/${whatsapp}`}
              icon="chat"
              title="Chat Directo"
              description="Escribe mensajes, comparte fotos."
            />
            <ContactItem
              href={`https://wa.me/${whatsapp}`}
              icon="whatsapp"
              title="WhatsApp"
              description="Llama a tu médico."
            />
          </div>
        </div>
        <div className="flex justify-center">
          <button
            onClick={handleScheduleClick}
            className="mt-4 bg-Justina_8 text-white py-2 px-4 rounded text-base md:text-lg"
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
