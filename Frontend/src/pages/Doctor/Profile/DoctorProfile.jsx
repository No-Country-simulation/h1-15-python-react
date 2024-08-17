import DoctorSchedule from "../../../components/DoctorProfile/DoctorSchedule";
import DoctorPersonal from "../../../components/DoctorProfile/DoctorPersonal";
import DoctorProfesional from "../../../components/DoctorProfile/DoctorProfesional";
import { useEffect, useState } from "react";
import { getDoctorData } from "../../../services/doctorService";

export default function DoctorProfile() {
  const [userData, setUserData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    getDoctorData().then((res) => {
      setUserData(res);
      setIsLoading(false);
    });
  }, []);
  return (
    <main>
      {!isLoading && (
        <>
          <h1 className="text-4xl font-bold">Mi perfil</h1>
          <section className="flex flex-col gap-5 divide-y-2">
            <DoctorPersonal
              email={userData.user.email}
              nombre={userData.user.first_name}
              apellido={userData.user.last_name}
            />
            <DoctorSchedule schedule={userData.schedule} />
            <DoctorProfesional
              consultation_phone={userData.consultation_phone}
              medical_license={userData.medical_license}
              specialty={userData.specialty}
            />
          </section>
        </>
      )}
    </main>
  );
}
