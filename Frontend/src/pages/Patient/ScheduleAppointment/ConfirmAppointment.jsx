import { useLocation, useNavigate } from "react-router-dom";
import BackButton from "../../../components/BackButton/BackButton";
import FooterNav from "../../../components/FooterNav/FooterNav";

function ConfirmAppointment() {
  const location = useLocation();
  const navigate = useNavigate();
  const { formData } = location.state || {};

  const handleConfirm = () => {
    navigate("/patient/appointment/success");
  };

  if (!formData)
    return (
      <p className="text-center text-red-600 text-lg sm:text-xl">
        No se encontraron datos del formulario.
      </p>
    );

  // Función para formatear la fecha en formato español largo
 const formatDate = (dateString) => {
  const [year, month, day] = dateString.split('-');
  const date = new Date(year, month - 1, day);
  const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  return date.toLocaleDateString('es-ES', options);
};
 


  return (
    <main className="max-w-screen-lg mx-auto p-6 min-h-screen flex flex-col pb-20">
      <BackButton />
      <section className="flex-grow">
        <div className="text-center mb-8">
          <h2 className="text-lg sm:text-3xl font-bold mb-4">Confirmación de Cita</h2>
        </div>
        <div className="bg-white p-6 sm:p-8 rounded-lg shadow-lg border border-gray-200 mb-8">
          <h1 className="text-lg sm:text-2xl font-semibold text-center mb-6">Datos del Médico</h1>
          <section className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            <div className="flex items-center justify-center mb-6">
              <img
                src={formData.doctorPhoto}
                alt={formData.doctorName || "Foto del médico"}
                className="w-32 h-32 sm:w-40 sm:h-40 rounded-full border-4 border-gray-300 shadow-lg"
              />
            </div>
            <div className="space-y-4">
              <div>
                <h3 className="text-lg sm:text-2xl font-semibold">Médico Responsable de la Atención:</h3>
                <p className="text-base sm:text-lg">{formData.doctorName}</p>
              </div>
              <div>
                <h3 className="text-xl sm:text-2xl font-semibold">Especialidad:</h3>
                <p className="text-base sm:text-lg">{formData.doctorSpecialty}</p>
              </div>
            </div>
          </section>
          <div className="space-y-4 mt-6">
            <h2 className="text-lg sm:text-2xl font-semibold mb-4">Datos de la Cita</h2>
            <div className="flex justify-between border-b border-gray-300 pb-4">
              <h3 className="text-lg sm:text-2xl font-semibold">Fecha:</h3>
              <p className="text-lg sm:text-xl">{formatDate(formData.date)}</p>
            </div>
            <div className="flex justify-between border-b border-gray-300 pb-4">
              <h3 className="text-lg sm:text-xl">Hora:</h3>
              <p className="text-lg sm:text-xl">{formData.time} Hrs.</p>
            </div>
            <h2 className="text-lg sm:text-2xl font-semibold mb-4">Datos del Paciente</h2>
            <div className="flex justify-between border-b border-gray-300 pb-4">
              <h3 className="text-lg sm:text-2xl font-semibold">Nombre</h3>
              <p className="text-lg sm:text-xl">{formData.name}</p>
            </div>
            <div className="flex justify-between border-b border-gray-300 pb-4">
              <h3 className="text-lg sm:text-2xl font-semibold">Correo Electrónico</h3>
              <p className="text-lg sm:text-xl">{formData.email}</p>
            </div>
            <div className="flex justify-between border-b border-gray-300 pb-4">
              <h3 className="text-lg sm:text-2xl font-semibold">Teléfono</h3>
              <p className="text-lg sm:text-xl">{formData.phone}</p>
            </div>
            <div className="flex flex-col">
              <h3 className="text-lg sm:text-2xl font-semibold">Observaciones</h3>
              <p className="text-lg sm:text-xl mt-2">{formData.reason}</p>
            </div>
          </div>
        </div>
        <div className="flex justify-center mt-8">
          <button
            onClick={handleConfirm}
            className="bg-[#D22B8B] text-white py-3 px-6 rounded-lg shadow-lg hover:bg-[#b81d6b] transition-colors font-semibold text-lg"
          >
            Confirmar Cita
          </button>
        </div>
      </section>
      <FooterNav className="fixed bottom-0 w-full shadow-lg" />
    </main>
  );
}

export default ConfirmAppointment;
