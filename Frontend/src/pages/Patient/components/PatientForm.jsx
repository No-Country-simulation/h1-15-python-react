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
    <h2 className="font-semibold text-normal mb-4">Datos del paciente</h2>
    <form onSubmit={onSubmit} className="space-y-4">
      <div>
        <label className="block text-gray-700">Nombre Completo</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={onInputChange}
          className="w-full px-4 py-2 border rounded-md outline-none"
          placeholder="Ingrese su nombre completo"
          required
        />
      </div>
      <div>
        <label className="block text-gray-700">Correo Electrónico</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={onInputChange}
          className="w-full px-4 py-2 border rounded-md outline-none"
          placeholder="Ingrese su correo electrónico"
          required
        />
      </div>
      <div>
        <label className="block text-gray-700">Teléfono</label>
        <PhoneInput
          country={"pe"}
          value={formData.phone}
          onChange={onPhoneChange}
          inputClass="w-full px-4 py-2 border rounded-md outline-none"
        />
      </div>
      <div>
        <label className="block text-gray-700">Motivo</label>
        <textarea
          name="reason"
          value={formData.reason}
          onChange={onInputChange}
          className="w-full px-4 py-2 border rounded-md outline-none"
          placeholder="Ingrese el motivo de la cita"
          rows="3"
          required
        />
        <VoiceDictation onDictate={onDictate} />
      </div>
      <div>
        <button
          type="submit"
          className="px-4 py-2 bg-gradient-button-2 text-white rounded-md"
        >
          Confirmar
        </button>
      </div>
    </form>
  </div>
);

export default PatientForm;
