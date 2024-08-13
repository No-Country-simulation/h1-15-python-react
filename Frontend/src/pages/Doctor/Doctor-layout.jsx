import { Outlet } from "react-router-dom";
import DoctorHeader from "../../components/Doctor-header/DoctorHeader";
import Navigation from "./Navigation";
import { useEffect } from "react";
import { fetchDoctorData } from "../../services/doctorService";

export default function DoctorLayout() {
  const doctor = JSON.parse(localStorage.getItem("userId"));

  useEffect(() => {
    fetchDoctorData(doctor);
  }, []);
  console.log(doctor);
  return (
    <main className="flex w-full min-h-[768px] p-5 gap-5 bg-slate-50">
      <Navigation />
      <section className="flex flex-col w-full">
        <DoctorHeader />
        <Outlet />
      </section>
    </main>
  );
}
