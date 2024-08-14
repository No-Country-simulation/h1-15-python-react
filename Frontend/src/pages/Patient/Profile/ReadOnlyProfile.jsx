/* eslint-disable react/prop-types */
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

const ReadOnlyProfile = ({ formData }) => {
  // Función para formatear la fecha en el formato requerido
  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toISOString().split("T")[0];
  };

  return (
    <section>
      <form className="bg-white overflow-hidden pb-20 mt-4">
        <section className="flex flex-col gap-1">
          {/* Sección Sobre Mí */}
          <label className="block text-black font-medium">Sobre mí</label>
          <div className="flex w-full">
            <textarea
              name="about_me"
              value={formData.about_me}
              className="border-gray-300 border rounded w-full outline-none bg-[#ccc3]"
              readOnly
            ></textarea>
          </div>

          <div>
            <label className="block text-black font-medium">
              Dirección de domicilio
            </label>
            <div className="flex pt-2">
              <textarea
                name="address"
                value={formData.address}
                placeholder="Usa el detector de Google Maps para ingresar tu ubicación"
                className="border-gray-300 border rounded w-full h-15 px-3 outline-none bg-[#ccc3] resize-none"
                readOnly
              />
            </div>
          </div>

          {/* Tipo de Documento y Número de Documento */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-black font-medium">
                Tipo de Documento
              </label>
              <select
                name="document_type"
                value={formData.document_type}
                className="border-gray-300 border rounded w-full h-10 px-3 mt-2 outline-none bg-[#ccc3]"
                readOnly
              >
                <option value="">Selecciona un tipo de documento</option>
                <option value={1}>DNI</option>
                <option value={2}>Pasaporte</option>
                <option value={3}>Cédula</option>
              </select>
            </div>
            <div>
              <label className="block text-black font-medium">
                Número de Documento
              </label>
              <input
                type="text"
                name="document_number"
                value={formData.document_number}
                className="border-gray-300 border rounded w-full h-10 px-3 mt-2 outline-none bg-[#ccc3]"
                readOnly
              />
            </div>
          </div>
          {/* Resto de los Inputs */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-black font-medium">
                Fecha de Nacimiento
              </label>
              <input
                type="date"
                name="birth_date"
                value={formatDate(formData.birth_date)}
                className="border-gray-300 border rounded w-full h-10 px-3 mt-2 outline-none bg-[#ccc3]"
                readOnly
              />
            </div>

            <div>
              <label className="block text-black font-medium">Género</label>
              <select
                name="gender"
                value={formData.gender}
                className="border-gray-300 border rounded w-full h-10 px-3 mt-2 outline-none bg-[#ccc3]"
                readOnly
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
                Número de Teléfono
              </label>
              <PhoneInput
                country={"ar"}
                value={formData.phone_number}
                inputStyle={{
                  width: "100%",
                  border: "1px solid #D1D5DB",
                  borderRadius: "0.375rem",
                  boxShadow: "0 1px 2px rgba(0, 0, 0, 0.05)",
                  backgroundColor:"#ccc3"
                }}
                inputProps={{
                  name: "phone_number",
                  readOnly: true,
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
                inputStyle={{
                  width: "100%",
                  border: "1px solid #D1D5DB",
                  borderRadius: "0.375rem",
                  boxShadow: "0 1px 2px rgba(0, 0, 0, 0.05)",
                  backgroundColor:"#ccc3"
                }}
                inputProps={{
                  name: "phone_number_2",
                  readOnly: true,
                }}
              />
            </div>
            <div>
              <label className="block text-black font-medium">
                Contacto de Emergencia
              </label>
              <input
                type="text"
                name="emergency_contact"
                value={formData.emergency_contact}
                placeholder="Parentesco-+54XXXXXXXXX"
                className="border-gray-300 border rounded w-full h-10 px-3 mt-2 outline-none bg-[#ccc3]"
                readOnly
              />
            </div>
            <div>
              <label className="block text-black font-medium">
                Tipo de Sangre
              </label>
              <select
                name="blood_type"
                value={formData.blood_type}
                className="border-gray-300 border rounded w-full h-10 px-3 mt-2 outline-none bg-[#ccc3]"
                readOnly
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
      </form>
    </section>
  );
};

export default ReadOnlyProfile;
