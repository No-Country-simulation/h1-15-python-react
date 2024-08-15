import { Outlet } from "react-router-dom";
import DoctorHeader from "../../components/Doctor-header/DoctorHeader";
import Navigation from "./Navigation";
import { useEffect, useState } from "react";
import { verifyUserDoctor } from "../../services/doctorService";
import ActiveDoctor from "../../components/ActiveDoctor/ActiveDoctor";

export default function DoctorLayout() {
  const [showActiveDoctor, setShowActiveDoctor] = useState(false);

  useEffect(() => {
    verifyUserDoctor().then((res) =>
      res.is_doctor ? setShowActiveDoctor(false) : setShowActiveDoctor(true),
    );
  }, []);

  return (
    <main className="flex w-full min-h-[768px] p-5 gap-5 bg-slate-50">
      <Navigation />
      <section className="flex flex-col w-full">
        <DoctorHeader />
        <Outlet />
      </section>
      {showActiveDoctor && <ActiveDoctor openModal={setShowActiveDoctor} />}
    </main>
  );
}
