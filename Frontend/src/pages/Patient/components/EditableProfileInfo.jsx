/* eslint-disable react/prop-types */
import VoiceDictation from "../../../components/VoiceDictation/VoiceDictation";
import Icon from "../../../components/Icon/Icon";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import AddressInput from "./AddressInput";

const EditableProfileInfo = ({
  formData,
  handleChange,
  handlePhoneChange,
  handleDictate,
  isAddressInputVisible,
  setAddressInputVisible,
  handleSubmit,
}) => {
  const handleAddressAccept = (address) => {
    handleChange({ target: { name: "address", value: address } });
    setAddressInputVisible(false);
  };

  const handleAddressClose = () => {
    setAddressInputVisible(false);
  };

  return (
    <section>
      <form
        onSubmit={handleSubmit}
        className="bg-white overflow-hidden pb-20 mt-4"
      >
        <section className="flex flex-col gap-1">
          {/* Sección Sobre Mí */}
          <label className="block text-black font-medium">Sobre mí <span className="text-red-500">*</span></label>
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
            <label className="block text-black font-medium">
              Dirección de domicilio <span className="text-red-500">*</span>
            </label>
            <div className="flex pt-2">
              <textarea
                name="address"
                value={formData.address}
                placeholder="Usa el detector de Google Maps para ingresar tu ubicación"
                onChange={handleChange}
                className="border-gray-300 border rounded w-full h-15 px-3 outline-none resize-none"
                readOnly
                required
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

          {/* Tipo de Documento y Número de Documento */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-black font-medium">
                Tipo de Documento <span className="text-red-500">*</span>
              </label>
              <select
                name="document_type"
                value={formData.document_type}
                onChange={handleChange}
                className="border-gray-300 border rounded w-full h-10 px-3 mt-2"
                required
              >
                <option value="">Selecciona un tipo de documento</option>
                <option value={1}>DNI</option>
                <option value={2}>Pasaporte</option>
                <option value={3}>Cédula</option>
              </select>
            </div>
            <div>
              <label className="block text-black font-medium">
                Número de Documento <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="document_number"
                value={formData.document_number}
                onChange={handleChange}
                className="border-gray-300 border rounded w-full h-10 px-3 mt-2"
                required
              />
            </div>
          </div>
          {/* Resto de los Inputs */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-black font-medium">
                Fecha de Nacimiento <span className="text-red-500">*</span>
              </label>
              <input
                type="date"
                name="birth_date"
                value={formData.birth_date}
                onChange={handleChange}
                className="border-gray-300 border rounded w-full h-10 px-3 mt-2"
                required
              />
            </div>

            <div>
              <label className="block text-black font-medium">Género <span className="text-red-500">*</span></label>
              <select
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                className="border-gray-300 border rounded w-full h-10 px-3 mt-2"
                required
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
              <label className="block text-black font-medium">
                Número de Teléfono <span className="text-red-500">*</span>
              </label>
              <PhoneInput
                country={"ar"}
                value={formData.phone_number}
                onChange={(value) => handlePhoneChange(value, "phone_number")}
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
              <label className="block text-black font-medium">
                Número de Celular
              </label>
              <PhoneInput
                country={"ar"}
                value={formData.phone_number_2}
                onChange={(value) => handlePhoneChange(value, "phone_number_2")}
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
              <label className="block text-black font-medium">
                Contacto de Emergencia <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="emergency_contact"
                value={formData.emergency_contact}
                onChange={handleChange}
                placeholder="Parentesco-Número de Teléfono"
                className="border-gray-300 border rounded w-full h-10 px-3 mt-2"
                required
              />
            </div>
            <div>
              <label className="block text-black font-medium">
                Tipo de Sangre <span className="text-red-500">*</span>
              </label>
              <select
                name="blood_type"
                value={formData.blood_type}
                onChange={handleChange}
                className="border-gray-300 border rounded w-full h-10 px-3 mt-2"
                required
              >
                <option value="">Seleccionar Tipo de Sangre</option>
                <option value="A+">A+</option>
                <option value="A-">A-</option>
                <option value="B+">B+</option>
                <option value="B-">B-</option>
                <option value="AB+">AB+</option>
                <option value="AB-">AB-</option>
                <option value="O+">O+</option>
                <option value="O-">O-</option>
              </select>
            </div>
          </div>
        </section>

        {/* Botón de Envío */}
        <div className="flex justify-end mt-6">
          <button
            type="submit"
            className="bg-magentaButton text-white py-2 px-6 rounded"
          >
            Guardar
          </button>
        </div>
      </form>

      {isAddressInputVisible && (
        <AddressInput
          onAccept={handleAddressAccept}
          onClose={handleAddressClose}
        />
      )}
    </section>
  );
};

export default EditableProfileInfo;
