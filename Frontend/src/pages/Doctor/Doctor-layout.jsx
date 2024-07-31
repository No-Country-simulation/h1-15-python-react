import { Outlet } from "react-router-dom";
import Navegacion from "./Navigation";
import DoctorHeader from "../../components/Doctor-header/DoctorHeader";

export default function DoctorLayout() {
  return (
    <main className="flex w-full min-h-[1024px] p-5 gap-5">
      <Navegacion />
      <section className="flex flex-col w-full">
        <DoctorHeader />
        <Outlet />
      </section>
    </main>
  );
}
