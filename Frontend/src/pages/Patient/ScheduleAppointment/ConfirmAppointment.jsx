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
    navigate("/patient/success-appointment");
  };

  if (!formData) return <p>No se encontraron datos del formulario.</p>;

  return (
    <main className="max-w-md mx-auto p-4 font-josefin">
      <BackButton/>
      <section className="pb-20">
        <h2 className="text-xl font-bold mb-4 text-center">Tu cita</h2>
        <div className="space-y-4">
        <div className="grid place-content-center">
            <div className="flex items-center">
              <img
                src={formData.doctorPhoto}
                alt={formData.doctorName}
                className="w-16 h-16 rounded-full mr-4"
              />
              <div>
                <p className="font-semibold">{formData.doctorName}</p>
                <p className="text-gray-600">{formData.doctorSpecialty}</p>
              </div>
            </div>
          </div>
          <div>
            <h3 className="font-semibold text-lg">Fecha</h3>
            <p>{format(new Date(formData.date), "dd MMMM yyyy")}</p>
          </div>
          <div>
            <h3 className="font-semibold text-lg">Hora</h3>
            <p>{formData.time}</p>
          </div>
          <div>
            <h3 className="font-semibold text-lg">Nombre</h3>
            <p>{formData.name}</p>
          </div>
          <div>
            <h3 className="font-semibold text-lg">Correo Electrónico</h3>
            <p>{formData.email}</p>
          </div>
          <div>
            <h3 className="font-semibold text-lg">Teléfono</h3>
            <p>{formData.phone}</p>
          </div>
          <div>
            <h3 className="font-semibold text-lg">Observaciones</h3>
            <p>{formData.reason}</p>
          </div>
         
          <div className="flex justify-center">
            <button
              onClick={handleConfirm}
              className="bg-Justina_8 text-white py-2 px-4 rounded-md outline-none"
            >
              Confirmar Cita
            </button>
          </div>
        </div>
      </section>
      <FooterNav/>
    </main>
  );
}

export default ConfirmAppointment;
