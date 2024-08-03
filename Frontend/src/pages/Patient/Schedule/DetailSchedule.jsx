import { useRef } from "react";
import { useParams } from "react-router-dom";
import data from "../../../data/patientDataSchedule.json";
import patientData from "../../../data/PatientProfile.json";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import BackButton from "../../../components/BackButton/BackButton";

const DetailSchedule = () => {
  const { id } = useParams();
  const pdfRef = useRef();

  const schedule = data.find((item) => item.id === id);

  if (!schedule) {
    return (
      <div className="p-6 text-center text-red-600">Detalle no encontrado</div>
    );
  }

  const patient = patientData;

  // eslint-disable-next-line react/prop-types
  const InfoRow = ({ label, value }) => (
    <tr className="border-t">
      <td className="px-4 py-2 font-semibold text-gray-700">{label}</td>
      <td className="px-4 py-2 text-gray-700">{value}</td>
    </tr>
  );

  const exportToPDF = async () => {
    const element = pdfRef.current;
    const pdf = new jsPDF();

    const pageWidth = pdf.internal.pageSize.width;
    const pageHeight = pdf.internal.pageSize.height;

    const canvas = await html2canvas(element, { scale: 1.5 });
    const imgData = canvas.toDataURL("image/jpeg", 1.0);

    const imgWidth = pageWidth;
    const imgHeight = (canvas.height * imgWidth) / canvas.width;

    // const xOffset = 0;
    // const yOffset = 0;

    if (imgHeight > pageHeight) {
      const heightRatio = pageHeight / imgHeight;
      const adjustedImgWidth = imgWidth * heightRatio;
      const adjustedImgHeight = pageHeight;

      const xOffset = (pageWidth - adjustedImgWidth) / 2;
      const yOffset = 0;

      pdf.addImage(
        imgData,
        "JPEG",
        xOffset,
        yOffset,
        adjustedImgWidth,
        adjustedImgHeight,
      );
    } else {
      const xOffset = (pageWidth - imgWidth) / 2;
      const yOffset = (pageHeight - imgHeight) / 2;

      pdf.addImage(imgData, "JPEG", xOffset, yOffset, imgWidth, imgHeight);
    }

    pdf.save(`cita-${schedule.id}.pdf`);
  };

  return (
    <main className="max-w-screen-lg mx-auto">
      <BackButton />
      <section className="grid justify-center">
        <button
          onClick={exportToPDF}
          className="m-4 px-4 py-2 bg-Justina_8 text-white rounded"
        >
          Exportar a PDF
        </button>
      </section>
      <section
        ref={pdfRef}
        className="p-6 max-w-4xl mx-auto bg-white shadow-lg rounded-lg border border-gray-200"
      >
        <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          Orden de Cita Médica N°{" "}
          <span className="ml-2 text-gray-600">{schedule.id}</span>
        </h1>

        <section className="mb-8">
          <h2 className="text-xl text-center font-semibold text-gray-800 mb-4">
            Información sobre la cita
          </h2>
          <table className="min-w-full bg-white">
            <tbody>
              <InfoRow label="Fecha de la Cita" value={schedule.date} />
              <InfoRow label="Hora de la Cita" value={schedule.timeRange} />
              <InfoRow label="Motivo de la Cita" value={schedule.reason} />
              <InfoRow label="Descripción" value={schedule.reasonDescription} />
            </tbody>
          </table>
        </section>

        <hr className="border-gray-300 mb-8" />

        <section className="mb-8">
          <div className="flex flex-col md:flex-row items-start space-x-0 md:space-x-4 mb-6">
            <img
              src={schedule.profileImage}
              alt={`${schedule.name}'s profile`}
              className="w-24 h-24 rounded-full object-cover shadow-md border border-gray-300"
            />
            <div className="flex flex-col mt-4 md:mt-0">
              <h2 className="text-xl font-semibold text-gray-800 mb-2">
                Información del Médico
              </h2>
              <table className="min-w-full bg-white">
                <tbody>
                  <InfoRow label="Nombre" value={schedule.name} />
                  <InfoRow label="Especialidad" value={schedule.specialty} />
                </tbody>
              </table>
            </div>
          </div>
        </section>

        <hr className="border-gray-300 mb-8" />

        <section>
          <div className="flex flex-col md:flex-row items-start space-x-0 md:space-x-4">
            <img
              src={patient.photo}
              alt={`${patient.name}'s profile`}
              className="w-24 h-24 rounded-full object-cover shadow-md border border-gray-300"
            />
            <div className="flex flex-col mt-4 md:mt-0">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">
                Información del Paciente
              </h2>
              <table className="min-w-full bg-white">
                <tbody>
                  <InfoRow label="Nombre" value={patient.name} />
                  <InfoRow label="Profesión" value={patient.profession} />
                  <InfoRow label="Edad" value={patient.age} />
                  <InfoRow label="Contacto" value={patient.contact} />
                  <InfoRow label="Teléfono" value={patient.phone} />
                  <InfoRow label="Sexo" value={patient.gender} />
                  <InfoRow
                    label="Fecha de Nacimiento"
                    value={new Date(patient.dateOfBirth).toLocaleDateString(
                      "es-ES",
                    )}
                  />
                  <InfoRow label="DNI" value={patient.dni} />
                  <InfoRow
                    label="Seguro Médico"
                    value={`${patient.insurance.provider} (Póliza: ${patient.insurance.policyNumber})`}
                  />
                </tbody>
              </table>
            </div>
          </div>
        </section>
      </section>
    </main>
  );
};

export default DetailSchedule;
