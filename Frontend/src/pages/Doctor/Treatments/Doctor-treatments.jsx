import CardTreatment from "../../../components/Cards/CardTreatment";

const DoctorTreatments = () => {
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
  return (
    <section>
      <h1 className="font-semibold text-[64px] font-josefin">Tratamientos</h1>
      <h3 className="font-medium text-2xl font-josefin mt-6">
        Seleccionar Tipo de tratamiento
      </h3>
      <section className="grid grid-cols-2 w-[90%] pl-28 mt-6 gap-5">
        {tarjetas.map((tarjeta, index) => (
          <CardTreatment
            key={index}
            tratamiento={tarjeta.tratamiento}
            descripcion={tarjeta.descripcion}
            color={tarjeta.id}
          />
        ))}
      </section>
    </section>
  );
};

export default DoctorTreatments;
