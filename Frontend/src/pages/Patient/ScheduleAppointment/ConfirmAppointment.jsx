import { useLocation, useNavigate } from "react-router-dom";
import { format } from "date-fns";
import BackButton from "../../../components/BackButton/BackButton";
import FooterNav from "../../../components/FooterNav/FooterNav";

function ConfirmAppointment() {
  const location = useLocation();
  const navigate = useNavigate();
  const { formData } = location.state || {};

  const handleConfirm = () => {
    console.log("Cita confirmada:", formData);
    navigate("/patient/appointment/success");
  };

  if (!formData) return <p>No se encontraron datos del formulario.</p>;

  return (
    <main className="max-w-screen-lg mx-auto p-4 font-josefin">
      <BackButton />
      <section className="pb-20">
        <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center">Tu cita</h2>
        <div className="space-y-6 md:space-y-8">
          <div className="flex flex-col items-center md:flex-row md:items-start md:justify-center">
            <img
              src={formData.doctorPhoto}
              alt={formData.doctorName}
              className="w-20 h-20 md:w-32 md:h-32 rounded-full mb-4 md:mb-0 md:mr-6"
            />
            <div className="text-center md:text-left">
              <p className="text-xl font-semibold">{formData.doctorName}</p>
              <p className="text-gray-600">{formData.doctorSpecialty}</p>
            </div>
          </div>
          <div>
            <h3 className="font-semibold text-lg md:text-xl">Fecha</h3>
            <p>{format(new Date(formData.date), "dd MMMM yyyy")}</p>
          </div>
          <div>
            <h3 className="font-semibold text-lg md:text-xl">Hora</h3>
            <p>{formData.time}</p>
          </div>
          <div>
            <h3 className="font-semibold text-lg md:text-xl">Nombre</h3>
            <p>{formData.name}</p>
          </div>
          <div>
            <h3 className="font-semibold text-lg md:text-xl">Correo Electrónico</h3>
            <p>{formData.email}</p>
          </div>
          <div>
            <h3 className="font-semibold text-lg md:text-xl">Teléfono</h3>
            <p>{formData.phone}</p>
          </div>
          <div>
            <h3 className="font-semibold text-lg md:text-xl">Observaciones</h3>
            <p>{formData.reason}</p>
          </div>

          <div className="flex justify-center mt-8">
            <button
              onClick={handleConfirm}
              className="bg-Justina_8 text-white py-2 px-6 rounded-md outline-none text-lg md:text-xl"
            >
              Confirmar Cita
            </button>
          </div>
        </div>
      </section>
      <FooterNav />
    </main>
  );
}

export default ConfirmAppointment;
