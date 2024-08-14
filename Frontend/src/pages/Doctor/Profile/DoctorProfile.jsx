import DoctorSchema from "../../../components/DoctorProfile/DoctorSchema";
import DoctorPersonal from "../../../components/DoctorProfile/DoctorPersonal";
import DoctorProfesional from "../../../components/DoctorProfile/DoctorProfesional";

export default function DoctorProfile() {
  return (
    <main className="font-josefin">
      <h1 className="text-4xl font-bold">Mi perfil</h1>
      <section className="flex flex-col gap-5 divide-y-2">
        <DoctorPersonal />
        <DoctorProfesional />
        <DoctorSchema />
      </section>
    </main>
  );
}
