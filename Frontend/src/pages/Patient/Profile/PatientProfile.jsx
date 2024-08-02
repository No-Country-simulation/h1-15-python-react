import BackButton from "../../../components/BackButton/BackButton";
import FooterNav from "../../../components/FooterNav/FooterNav";
import patientData from "../../../data/PatientProfile.json";

const PatientProfile = () => {
  return (
    <section className="grid max-w-screen-lg w-full mx-auto p-2">
      <section>
        <BackButton />
      </section>
      <div className="bg-white rounded-xl shadow-md overflow-hidden pb-20">
        <div className="flex flex-col">
          <div className="w-full flex justify-center">
            <img
              className="w-70% object-cover md:w-48"
              src={patientData.photo}
              alt={patientData.name}
            />
          </div>
          <div className="p-4">
            <h1 className="block mt-1 text-3xl leading-tight font-medium text-black text-center">
              {patientData.name}
            </h1>
            <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold text-center">
              {patientData.profession}
            </div>
            <p className="mt-2 text-gray-500">{patientData.bio}</p>
            <div className="mt-4">
              <span className="text-gray-700 font-bold">Edad:</span>{" "}
              {patientData.age}
            </div>
            <div className="mt-2">
              <span className="text-gray-700 font-bold">Contacto:</span>{" "}
              {patientData.contact}
            </div>
            <div className="mt-4">
              <span className="text-gray-700 font-bold">Sexo:</span>{" "}
              {patientData.gender}
            </div>
            <div className="mt-2">
              <span className="text-gray-700 font-bold">
                Fecha de Nacimiento:
              </span>{" "}
              {new Date(patientData.dateOfBirth).toLocaleDateString("es-ES")}
            </div>
            <div className="mt-2">
              <span className="text-gray-700 font-bold">DNI:</span>{" "}
              {patientData.dni}
            </div>
            <div className="mt-4">
              <span className="text-gray-700 font-bold">Historial Médico:</span>{" "}
              {patientData.medicalHistory}
            </div>
            <div className="mt-2">
              <span className="text-gray-700 font-bold">Alergias:</span>{" "}
              {patientData.allergies}
            </div>
            <div className="mt-2">
              <span className="text-gray-700 font-bold">
                Medicamentos Actuales:
              </span>{" "}
              {patientData.currentMedications}
            </div>
            <div className="mt-4">
              <span className="text-gray-700 font-bold">
                Contacto de Emergencia:
              </span>{" "}
              {patientData.emergencyContact.name} (
              {patientData.emergencyContact.relation}) -{" "}
              {patientData.emergencyContact.phone}
            </div>
            <div className="mt-4">
              <span className="text-gray-700 font-bold">Seguro Médico:</span>{" "}
              {patientData.insurance.provider}
            </div>
            <div className="mt-2">
              <span className="text-gray-700 font-bold">Número de Póliza:</span>{" "}
              {patientData.insurance.policyNumber}
            </div>
            <div className="mt-2">
              <span className="text-gray-700 font-bold">Cobertura:</span>{" "}
              {patientData.insurance.coverage}
            </div>
          </div>
        </div>
      </div>
      <section>
        <FooterNav />
      </section>
    </section>
  );
};

export default PatientProfile;
