import { useEffect, useState } from "react";
import { getUserData } from "../../services/userServices";

export default function DoctorPersonal() {
  const [userData, setUserData] = useState({
    email: "",
    nombre: "",
    apellido: "",
  });

  useEffect(() => {
    getUserData().then((res) =>
      setUserData({
        email: res.email,
        nombre: res.first_name,
        apellido: res.last_name,
      }),
    );
  }, []);

  return (
    <section className="pt-4">
      <h2 className="text-xl text-slate-500">Datos personales</h2>
      <div className="grid grid-cols-3 p-4 gap-4">
        {Object.entries(userData).map(([prop, value], index) => (
          <label
            className="relative rounded border border-[#79747E] flex justify-center items-center h-12"
            key={index}
          >
            <p className="text-sm absolute p-1 -top-4 bg-slate-50 left-3 capitalize">
              {prop}
            </p>
            <p className="w-full px-4 text-sm bg-transparent">{value}</p>
          </label>
        ))}
      </div>
    </section>
  );
}
