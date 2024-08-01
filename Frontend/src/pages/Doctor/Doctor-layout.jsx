import { Outlet } from "react-router-dom";
import DoctorHeader from "../../components/Doctor-header/DoctorHeader";
import Navigation from "./Navigation";

export default function DoctorLayout() {
  return (
    <main className="flex w-full min-h-[1024px] p-5 gap-5">
      <Navigation />
      <section className="flex flex-col w-full">
        <DoctorHeader />
        <Outlet />
      </section>
    </main>
  );
}
