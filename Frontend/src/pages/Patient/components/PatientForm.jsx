/* eslint-disable react/prop-types */
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import VoiceDictation from "../../../components/VoiceDictation/VoiceDictation";

const PatientForm = ({
  formData,
  onInputChange,
  onPhoneChange,
  onDictate,
  onSubmit,
}) => (
  <div>
    <h2 className="text-2xl font-semibold mb-6">Datos del paciente</h2>
    <form onSubmit={onSubmit} className="space-y-6">
      <div>
        <label className="block text-sm md:text-lg font-medium mb-2">Nombre Completo</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={onInputChange}
          className="w-full px-4 py-3 bg-inherit outline-none border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
          placeholder="Ingrese su nombre completo"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium mb-2 md:text-lg">Correo Electrónico</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={onInputChange}
          className="w-full px-4 py-3 border border-gray-300 bg-inherit rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500 "
          placeholder="Ingrese su correo electrónico"
          required
        />
      </div>
      <div>
        <label className="block text-sm md:text-lg font-medium mb-2">Teléfono</label>
        <PhoneInput
          country={"pe"}
          value={formData.phone}
          onChange={onPhoneChange}
          inputClass="w-full px-4 py-3 border border-gray-300 rounded-md md:text-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
          inputStyle={{
            width: "100%",
            height:"100%",
            paddingBlock: "1rem",
            backgroundColor: "inherit",
            border: "2px solid #e5e7eb", 
            borderRadius: "0.375rem", 
          }}
        />
      </div>
      <div>
        <label className="block text-sm md:text-lg font-medium mb-2">Motivo</label>
        <section className="flex flex-col md:flex-row gap-4">
        <textarea
          name="reason"
          value={formData.reason}
          onChange={onInputChange}
          className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500 bg-inherit"
          placeholder="Ingrese el motivo de la cita"
          rows="4"
          required
        />
        <div className="flex justify-center items-center"> 
        <VoiceDictation onDictate={onDictate} />
        </div>
        </section>
      </div>
      <div className="flex justify-center">
        <button
          type="submit"
          className="w-full md:w-1/2 px-4 py-3 bg-gradient-to-r from-pink-600 to-pink-500 text-white rounded-md hover:opacity-90 transition-opacity"
        >
          Confirmar
        </button>
      </div>
    </form>
  </div>
);

export default PatientForm;
