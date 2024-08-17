import CardTreatment from "../../../components/Cards/CardTreatment";
import TreatmentModal from "../../../components/Modal/TreatmentModal";
import { useState } from "react";

const DoctorTreatments = () => {
  const [show, setShow] = useState(false);
  const [tratamiento, setTratamiento] = useState(null);
  const tarjetas = [
    {
      id: 0,
      tratamiento: "Terapia Física",
      descripcion:
        "Ejercicios y técnicas para mejorar la movilidad y la función física.",
    },
    {
      id: 1,
      tratamiento: "Terapia Psicológica o Psiquiátrica",
      descripcion:
        "Intervenciones para tratar problemas mentales y emocionales.",
    },
    {
      id: 2,
      tratamiento: "Cambios en el Estilo de Vida",
      descripcion:
        "Recomendaciones para mejorar hábitos y aumentar la salud general.",
    },
    {
      id: 3,
      tratamiento: "Educación y Apoyo",
      descripcion:
        "Información y recursos para ayudar a manejar mejor la condición.",
    },
    {
      id: 4,
      tratamiento: "Soporte Social y Comunitario",
      descripcion:
        "Grupos de apoyo para compartir experiencias y recibir ayuda.",
    },
    {
      id: 5,
      tratamiento: "Terapias Complementarias y Alternativas",
      descripcion: "Prácticas adicionales para mejorar el bienestar general.",
    },
    {
      id: 6,
      tratamiento: "Cirugía",
      descripcion:
        "Intervenciones quirúrgicas para corregir o tratar problemas de salud.",
    },
    {
      id: 7,
      tratamiento: "Rehabilitación",
      descripcion:
        "Programas diseñados para la recuperación después de una enfermedad o cirugía.",
    },
    {
      id: 8,
      tratamiento: "Terapia Ocupacional",
      descripcion:
        "Ayuda en la realización de actividades diarias con mayor facilidad.",
    },
    {
      id: 9,
      tratamiento: "Soporte Social y Comunitario",
      descripcion:
        "Grupos de apoyo para compartir experiencias y recibir ayuda.",
    },
    {
      id: 10,
      tratamiento: "Cuidados Paliativos",
      descripcion:
        "Atención enfocada en mejorar la calidad de vida en enfermedades graves.",
    },
  ];
  const handleShow = (tratamiento) => {
    setTratamiento(tratamiento);
    setShow(true);
  };

  return (
    <section>
      <h1 className="font-semibold text-3xl">Tratamientos</h1>
      <h3 className="font-medium text-base md:text-2xl md:mt-6">
        Seleccionar Tipo de tratamiento
      </h3>
      <section className="grid grid-cols-1  xl:grid-cols-2 w-[90%] md:pl-28 mt-6 gap-5">
        {tarjetas.map((tarjeta, index) => (
          <CardTreatment
            key={index}
            tratamiento={tarjeta.tratamiento}
            descripcion={tarjeta.descripcion}
            color={tarjeta.id}
            set={handleShow}
          />
        ))}
        {show && (
          <TreatmentModal
            tratamiento={tratamiento}
            show={show}
            setShow={setShow}
          />
        )}
      </section>
    </section>
  );
};

export default DoctorTreatments;
