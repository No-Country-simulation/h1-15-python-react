import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getDoctorDataAll } from "../../../services/doctorService";
import FooterNav from "../../../components/FooterNav/FooterNav";
import BackButton from "../../../components/BackButton/BackButton";
import ContactItem from "./ContactItem";
import Spinner from "../../../components/Spinner";
import Icon from "../../../components/Icon/Icon";
import Reviews from "../components/Reviews";

function DoctorDetail() {
  const { id } = useParams();
  const [doctor, setDoctor] = useState(null);
  const [openSchedule, setOpenSchedule] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDoctorData = async () => {
      try {
        const doctorsData = await getDoctorDataAll();
        const selectedDoctor = doctorsData.find(
          (doc) => doc.id === parseInt(id),
        );
        setDoctor(selectedDoctor);
      } catch (error) {
        console.error("Error al obtener los datos del doctor:", error);
      }
    };

    fetchDoctorData();
  }, [id]);

  if (!doctor) {
    return (
      <div>
        <Spinner />
      </div>
    );
  }

  const {
    user: { url_photo, first_name, last_name },
    specialty,
    medical_license,
    consultation_phone,
    whatsapp,
    reviews,
    rating,
    schedule,
  } = doctor;

  const handleScheduleClick = () => {
    navigate(`/patient/schedule/appointment/${id}`);
  };

  const toggleSchedule = (place) => {
    setOpenSchedule((prev) => (prev === place ? null : place));
  };


  return (
    <main className="max-w-screen-lg mx-auto p-4">
      <BackButton />
      <section className="pb-20">
        <img
          src={url_photo}
          alt={`${first_name} ${last_name}`}
          className="w-32 h-32 md:w-48 md:h-48 lg:w-56 lg:h-56 rounded-full mx-auto mb-4 shadow-lg border-4 border-gray-200"
        />
        <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-center text-gray-800 underline underline-offset-8 decoration-magentaButton">
          Dr {first_name} {last_name}
        </h1>
        <p className="text-center text-gray-500 text-base md:text-lg italic">
          {specialty}
        </p>

        <div className="text-center mt-2 flex justify-center items-center">
          <span className="font-semibold text-lg md:text-xl text-magentaButton">
            {rating !== null ? rating : "0"}
          </span>
          <span className="ml-2 text-yellow-500 text-2xl">★</span>
        </div>

        <Reviews
          doctorId={id}
          reviews={reviews}
        />

        <div className="mt-4 bg-gray-50 p-4 rounded-lg shadow-inner">
          <h2 className="text-lg md:text-xl lg:text-2xl font-semibold border-b pb-2 border-gray-300">
            Sobre el especialista
          </h2>
          <p className="mt-2 text-base md:text-lg">
            Licencia Médica: {medical_license}
          </p>

          {Object.keys(schedule).length > 0 && (
            <>
              {Object.entries(schedule).map(([place, days]) => (
                <div key={place} className="mb-5">
                  <div
                    onClick={() => toggleSchedule(place)}
                    className="flex justify-between items-center cursor-pointer bg-gray-200 hover:bg-gray-300 p-2 rounded-lg transition-all duration-300"
                  >
                    <h3 className="font-semibold text-base md:text-lg">
                      {place}
                    </h3>
                    <button className="text-sm md:text-base">
                      {openSchedule === place ? (
                        <Icon name="FaChevronUpIcon" />
                      ) : (
                        <Icon name="FaChevronDownIcon" />
                      )}
                    </button>
                  </div>
                  <div
                    className={`mt-2 pl-4 transition-all duration-300 ease-in-out transform ${openSchedule === place ? "max-h-screen" : "max-h-0 overflow-hidden"}`}
                  >
                    {openSchedule === place && (
                      <>
                        {Object.entries(days).map(([day, hours]) => (
                          <p key={day} className="text-base md:text-lg">
                            <span className="font-normal">{day}: </span>
                            {hours.map((period, index) => (
                              <span key={index} className="font-semibold">
                                {period.join(" - ")}
                                {index < hours.length - 1 ? ", " : ""}
                              </span>
                            ))}
                          </p>
                        ))}
                      </>
                    )}
                  </div>
                </div>
              ))}
            </>
          )}
        </div>

        <div className="mt-4">
          <h2 className="text-lg md:text-xl lg:text-2xl font-semibold pb-4">
            Contacto
          </h2>
          <div className="grid gap-4 p-4 bg-gray-50 rounded-lg shadow-lg">
            <ContactItem
              href={`https://wa.me/${consultation_phone}`}
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
        <div className="flex justify-center mt-8">
          <button
            onClick={handleScheduleClick}
            className="w-full md:w-1/2 bg-magentaButton text-white py-2 px-4 rounded text-base md:text-lg shadow-md hover:bg-magentaHover transition-all duration-300"
          >
            Agendar una cita
          </button>
        </div>
      </section>
      <FooterNav className="fixed bottom-0 w-full shadow-xl" />
    </main>
  );
}

export default DoctorDetail;
