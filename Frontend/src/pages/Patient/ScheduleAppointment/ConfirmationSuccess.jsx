import { Link } from "react-router-dom";

function ConfirmationSuccess() {
  return (
    <main className="max-w-scree-lg mx-auto p-4">
      <h2 className="text-xl font-bold mb-4 text-center">¡Cita Confirmada!</h2>
      <div className="text-center">
        <p className="mb-4">
          Tu cita ha sido confirmada exitosamente. ¡Gracias por agendar con
          nosotros!
        </p>
        <p className="mb-4">
          Te hemos enviado un correo electrónico con todos los detalles de tu
          cita.
        </p>
        <div className="mt-6">
          <Link
            to="/patient"
            className="bg-Justina_8 text-white py-2 px-4 rounded-md inline-block"
          >
            Volver a la Página Principal
          </Link>
        </div>
      </div>
    </main>
  );
}

export default ConfirmationSuccess;
