/* eslint-disable react/prop-types */
import { useState } from "react";
import { updateDoctorData } from "../../services/doctorService";
import PhoneInput from "react-phone-input-2";
import { showToast } from "../../utils/toast";
import { ToastContainer } from "react-toastify";
export default function DoctorProfesional({
  medical_license,
  consultation_phone,
  specialty,
}) {
  const [disableInputsDoctorData, setDisableInputsDoctorData] = useState(true);
  const [phoneNumber, setPhoneNumber] = useState(null);
  const [licenseInput, setLicenseInput] = useState(null);

  function updateDoctorDataSubmit(e) {
    e.preventDefault();
    updateDoctorData({
      medical_license: licenseInput ?? medical_license,
      consultation_phone: phoneNumber ?? consultation_phone,
    }).then(showToast("Se han guardado los cambios."));
    setDisableInputsDoctorData((prev) => !prev);
  }

  return (
    <section className="pt-4">
      <ToastContainer />
      <div className="flex items-center gap-5">
        <h2 className="text-xl text-slate-500">Datos profesionales</h2>
        {medical_license && (
          <div className="flex justify-between items-center my-3 gap-5">
            <span
              className="hover:cursor-pointer bg-slate-200 p-1 rounded"
              onClick={() => setDisableInputsDoctorData((prev) => !prev)}
            >
              Editar
            </span>
            {!disableInputsDoctorData && (
              <button
                type="submit"
                form="updateDoctorForm"
                className="hover:cursor-pointer bg-magentaButton text-white p-1 rounded"
              >
                Guardar
              </button>
            )}
          </div>
        )}
      </div>

      <form
        id="updateDoctorForm"
        className="grid grid-cols-3 p-4 gap-4"
        onSubmit={updateDoctorDataSubmit}
      >
        <label className="flex flex-col relative rounded border border-[#79747E] h-12">
          <p className="text-sm absolute p-1 -top-4 bg-slate-50 left-3  z-10">
            Especialidad
          </p>
          <input
            required
            defaultValue={specialty}
            disabled
            className="block w-full h-full px-4 text-sm bg-transparent appearance-none focus:outline-none peer disabled:text-gray-500 disabled:cursor-not-allowed"
          />
        </label>
        <label className="flex flex-col relative rounded border border-[#79747E] h-12">
          <p className="text-sm absolute p-1 -top-4 bg-slate-50 left-3  z-10">
            Nº de matricula
          </p>
          <input
            required
            defaultValue={medical_license}
            disabled={disableInputsDoctorData}
            className="w-full h-full px-4 text-sm bg-transparent appearance-none focus:outline-none peer disabled:text-gray-500 disabled:cursor-not-allowed"
            onChange={({ target }) => setLicenseInput(target.value)}
          />
        </label>
        <label className="flex flex-col relative rounded border border-[#79747E] h-12">
          <p className="text-sm absolute p-1 -top-4 bg-slate-50 left-3  z-10">
            Teléfono para consultas
          </p>
          <PhoneInput
            required
            value={consultation_phone}
            disabled={disableInputsDoctorData}
            country={"ar"}
            onChange={setPhoneNumber}
            containerClass="h-full"
            inputClass="disabled:text-gray-500"
            inputStyle={{
              width: "100%",
              paddingBlock: "1rem",
              backgroundColor: "transparent",
              height: "100%",
              border: "none",
            }}
          />
        </label>
      </form>
    </section>
  );
}
