import AdherenceCard from "./AdherenceCard";
import AdherenceHeader from "./AdherenceHeader";
import AdherenceTable from "./AdherenceTable";
import CardPatientAdherence from "./CardPatientAdherence";

const Adherence = () => {
  const datos = [
    { tipo: "Física", fecha: "15/8/2024", completo: "Sí" },
    { tipo: "Ibuprofeno (Medicación)", fecha: "15/8/2024", completo: "No" },
    { tipo: "Psicología", fecha: "15/8/2024", completo: "No" },
    { tipo: "Paleativos", fecha: "15/8/2024", completo: "Sí" },
    { tipo: "Bayaspirina (Medicación)", fecha: "15/8/2024", completo: "Sí" },
    { tipo: "Insulina (Medicación)", fecha: "15/8/2024", completo: "No" },
  ];

  const paciente = {
    name: "Max Cereceda",
    age: 26,
    attentionDate: "15 de agosto de 2024",
    picture: "https://res.cloudinary.com/dzllpjhiv/image/upload/v1723817686/174754808_kkacqk.jpg",
    headDoctor:"Rafael Strongoli"

  };

  return (
    <main>
      <AdherenceHeader patient={paciente} />
      <section className="w-full flex gap-8 justify-between">
      <div className="grid gap-4 w-full">
        <section className="grid grid-cols-2 pt-10">
          <AdherenceCard
            title="Adherencia a medicamentos"
            description="La adherencia es baja"
            percentage={49.4}
          />
          <AdherenceCard
            title="Adherencia a Tratamientos"
            description="La adherencia es Óptima"
            percentage={98}
          />
        </section>
        <section>
          <AdherenceTable data={datos} />
        </section>
      </div>
      <div className="col-start-6 col-end-8 px-2">
        <CardPatientAdherence paciente={paciente} />
      </div>
      </section>
    </main>
  );
};

export default Adherence;
