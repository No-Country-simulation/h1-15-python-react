/* eslint-disable react/prop-types */
import { useState } from "react";
import VoiceDictation from "../../../components/VoiceDictation/VoiceDictation";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import Icon from "../../../components/Icon/Icon";
import AddressInput from "../components/AddressInput";
import ImageUploader from "../components/ImageUploader";

const EditProfileForm = ({ formData, setFormData, handleSubmit, handleEditToggle }) => {
  const [isAddressInputVisible, setAddressInputVisible] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handlePhoneChange = (value, name) => {
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleAddressAccept = (address) => {
    setFormData({
      ...formData,
      address: address,
    });
    setAddressInputVisible(false);
  };

  const handleAddressClose = () => {
    setAddressInputVisible(false);
  };

  const handleDictate = (text) => {
    setFormData({
      ...formData,
      about_me: text,
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <section className="flex flex-col gap-1">
        <ImageUploader />
        <label className="block text-black font-medium">Sobre mí</label>
        <div className="flex w-full">
          <textarea
            name="about_me"
            value={formData.about_me}
            onChange={handleChange}
            className="border-gray-300 border rounded w-full"
          ></textarea>
          <section className="flex items-center m-2">
            <VoiceDictation onDictate={handleDictate} />
          </section>
        </div>

        <div>
          <label className="block text-black font-medium">Dirección de domicilio</label>
          <div className="flex pt-2">
            <textarea
              name="address"
              value={formData.address}
              placeholder="Usa el detector de Google Maps para ingresar tu ubicación"
              onChange={handleChange}
              className="border-gray-300 border rounded w-full h-15 px-3 outline-none resize-none"
              readOnly
            />
            <button
              type="button"
              onClick={() => setAddressInputVisible(true)}
              className="flex h-10 w-20 max-w-14 outline-none text-3xl items-center justify-center"
            >
              <Icon name="SiGooglemaps" />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-black font-medium">Tipo de Documento</label>
            <select
              name="document_type"
              value={formData.document_type}
              onChange={handleChange}
              className="border-gray-300 border rounded w-full h-10 px-3 mt-2 bg-inherit"
            >
              <option value={1}>DNI</option>
              <option value={3}>Pasaporte</option>
              <option value={4}>Cédula</option>
            </select>
          </div>
          <div>
            <label className="block text-black font-medium">Número de Documento</label>
            <input
              type="text"
              name="document_number"
              value={formData.document_number}
              onChange={handleChange}
              className="border-gray-300 border rounded w-full h-10 px-3 mt-2"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-black font-medium">Fecha de Nacimiento</label>
            <input
              type="date"
              name="birth_date"
              value={formData.birth_date}
              onChange={handleChange}
              className="border-gray-300 border rounded w-full h-10 px-3 mt-2"
            />
          </div>

          <div>
            <label className="block text-black font-medium">Género</label>
            <select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              className="border-gray-300 border rounded w-full h-10 px-3 mt-2 bg-inherit"
            >
              <option value="">Selecciona un género</option>
              <option value="Masculino">Masculino</option>
              <option value="Femenino">Femenino</option>
              <option value="No binario">No binario</option>
              <option value="Otro">Otro</option>
              <option value="Prefiero no decir">Prefiero no decir</option>
            </select>
          </div>

          <div>
            <label className="block text-black font-medium">Número de Teléfono</label>
            <PhoneInput
              country={"ar"}
              value={formData.phone_number}
              onChange={(value) =>
                handlePhoneChange(value, "phone_number")
              }
              inputStyle={{
                width: "100%",
                border: "1px solid #D1D5DB",
                borderRadius: "0.375rem",
                boxShadow: "0 1px 2px rgba(0, 0, 0, 0.05)",
              }}
              inputProps={{
                name: "phone_number",
                required: true,
              }}
            />
          </div>

          <div>
            <label className="block text-black font-medium">Número de Celular</label>
            <PhoneInput
              country={"ar"}
              value={formData.phone_number_2}
              onChange={(value) =>
                handlePhoneChange(value, "phone_number_2")
              }
              inputStyle={{
                width: "100%",
                border: "1px solid #D1D5DB",
                borderRadius: "0.375rem",
                boxShadow: "0 1px 2px rgba(0, 0, 0, 0.05)",
              }}
              inputProps={{
                name: "phone_number_2",
                required: true,
              }}
            />
          </div>

          <div>
            <label className="block text-black font-medium">Contacto de Emergencia</label>
            <input
              type="text"
              name="emergency_contact"
              value={formData.emergency_contact}
              onChange={handleChange}
              className="border-gray-300 border rounded w-full h-10 px-3 mt-2"
            />
          </div>
          <div>
            <label className="block text-black font-medium">Grupo Sanguíneo</label>
            <input
              type="text"
              name="blood_type"
              value={formData.blood_type}
              onChange={handleChange}
              className="border-gray-300 border rounded w-full h-10 px-3 mt-2"
            />
          </div>
        </div>
      </section>

      <div className="flex justify-end mt-4">
        <button
          type="button"
          onClick={handleEditToggle}
          className="bg-gray-500 text-white py-2 px-4 rounded mr-2"
        >
          Cancelar
        </button>
        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 rounded"
        >
          Guardar
        </button>
      </div>

      {isAddressInputVisible && (
        <AddressInput
          onAccept={handleAddressAccept}
          onClose={handleAddressClose}
        />
      )}
    </form>
  );
};

export default EditProfileForm;
