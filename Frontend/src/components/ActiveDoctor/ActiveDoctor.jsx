/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { postDoctorUser } from "../../services/doctorService";
import { getSpecialties } from "../../services/specialtyService";
import { showToast } from "../../utils/toast";
import PhoneInput from "react-phone-input-2";
import { ToastContainer } from "react-toastify";

export default function ActiveDoctor({ openModal }) {
  const [phoneNumber, setPhoneNumber] = useState(null);
  const [specialty, setSpecialty] = useState(null);
  const [medical_license, setMedical_license] = useState(null);
  const [specialties, setSpecialties] = useState([]);

  useEffect(() => {
    getSpecialties().then((res) => setSpecialties(res));
  }, []);
  function saveProfessionalData(e) {
    e.preventDefault();

    if (phoneNumber && specialty && medical_license) {
      postDoctorUser({
        medical_license: medical_license,
        consultation_phone: phoneNumber,
        specialty: Number(specialty),
      });
      openModal(false);
      showToast("Se han guardado tus datos.");
    } else {
      showToast("Quedan campos vacíos.", "error");
    }
  }
  return (
    <article className="flex absolute inset-0 backdrop-blur-sm backdrop-brightness-75 z-50">
      <ToastContainer />
      <div className="h-2/3 aspect-square bg-slate-50 m-auto rounded-lg p-5">
        <h2 className="text-xl font-semibold text-center">
          Registro de Información profesional
        </h2>
        <p className="text-sm text-center my-2">
          Gracias por ser parte de Justina.io, antes de continuar necesitamos
          que ingreses los siguientes datos.
        </p>
        <form onSubmit={saveProfessionalData} className="flex flex-col gap-5">
          <label className="flex flex-col  ">
            Elige tu especialidad
            <select
              defaultValue={0}
              name="specialty"
              className="border p-2 rounded-lg"
              onChange={({ target }) => setSpecialty(target.value)}
            >
              <option value={0} disabled>
                Elige una opción
              </option>
              {specialties.map((item, index) => (
                <option value={item.id} key={index}>
                  {item.name}
                </option>
              ))}
            </select>
          </label>
          <label className="flex flex-col ">
            Nº de matricula
            <input
              name="medical_license"
              className="border p-2 rounded-lg"
              onChange={({ target }) => setMedical_license(target.value)}
            />
          </label>
          <label className="flex flex-col ">
            Teléfono para consultas
            <PhoneInput
              country={"ar"}
              onChange={setPhoneNumber}
              inputClass="border border-gray-300 rounded h-[40px] text-sm px-3"
              specialLabel=""
              inputStyle={{
                width: "100%",
                padding: "10px 10px 10px 26px",
                border: "1px solid #D1D5DB",
                borderRadius: "0.375rem",
                boxShadow: "0 1px 2px rgba(0, 0, 0, 0.05)",
                textIndent: "24px",
                height: "40px",
              }}
            />
          </label>
          <div className="flex gap-5">
            <button
              type="submit"
              className="hover:cursor-pointer bg-magentaButton text-white p-2 rounded w-full"
            >
              Guardar
            </button>
            <button
              className="hover:cursor-pointer bg-slate-200 p-2 rounded w-full"
              onClick={() => openModal(false)}
            >
              Omitir
            </button>
          </div>
        </form>
      </div>
    </article>
  );
}
