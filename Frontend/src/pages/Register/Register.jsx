import { useState } from "react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

import eye from "/icons/eye.svg";
import eye_off from "/icons/eye_off.svg";

const Register = () => {
  const [phone, setPhone] = useState("+54");
  const [secondaryPhone, setSecondaryPhone] = useState("+54");
  const [passwordVisible, setPasswordVisible] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  return (
    <main className="flex p-4 flex-col items-center justify-center min-h-screen bg-gradient-background_1">
      <section className="flex lg:max-w-[788px] flex-col justify-center p-[24px] bg-white shadow-lg rounded-lg overflow-hidden w-full">
        <section className="max-w-[206px] mb-6 cursor-pointer">
          <img src="/icons/arrowleft.svg" alt="logo" />
        </section>
        <section>
          <h1 className="text-left text-[32px] font-bold">
            Registrarse
          </h1>
          <p className="mt-6 text-left text-sm text-text_primary">
            ¿Ya tienes una cuenta?
            <span className="ml-1 text-text_secondary font-semibold cursor-pointer">
              Iniciar Sesión
            </span>
          </p>
        </section>
        <section className="flex flex-col justify-center w-full pt-6">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="flex flex-col md:flex-row space-y-4 md:space-x-9 md:space-y-0">
              <div className="flex-1">
                <label
                  htmlFor="first-name"
                  className="block text-sm font-medium"
                >
                  Nombre
                </label>
                <input
                  id="first-name"
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-secondary-500 focus:border-secondary-500 sm:text-sm"
                  type="text"
                  placeholder="Ingrese su nombre"
                  required
                />
              </div>
              <div className="flex-1">
                <label
                  htmlFor="last-name"
                  className="block text-sm font-medium"
                >
                  Apellido
                </label>
                <input
                  id="last-name"
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-secondary-500 focus:border-secondary-500 sm:text-sm"
                  type="text"
                  placeholder="Ingrese su apellido"
                  required
                />
              </div>
            </div>
            <div>
              <label htmlFor="dni" className="block text-sm font-medium">
                DNI
              </label>
              <input
                id="dni"
                className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-secondary-500 focus:border-secondary-500 sm:text-sm"
                type="text"
                placeholder="Ingrese su DNI"
                required
              />
            </div>
            <div>
              <label
                htmlFor="obra-social"
                className="block text-sm font-medium"
              >
                Obra Social
              </label>
              <input
                id="obra-social"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-secondary-500 focus:border-secondary-500 sm:text-sm"
                type="text"
                placeholder="Ingrese su obra social"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium">
                Correo
              </label>
              <input
                id="email"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-secondary-500 focus:border-secondary-500 sm:text-sm"
                type="email"
                placeholder="Ingrese su correo electrónico"
                required
              />
            </div>
            <div>
              <label htmlFor="nacimiento" className="block text-sm font-medium">
                Fecha de Nacimiento
              </label>
              <input
                id="nacimiento"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-secondary-500 focus:border-secondary-500 sm:text-sm"
                type="date"
                required
              />
            </div>
            <div>
              <label htmlFor="telefono" className="block text-sm font-medium">
                Número de Teléfono
              </label>
              <PhoneInput
                country={"ar"}
                value={phone}
                onChange={setPhone}
                inputStyle={{
                  width: "100%",
                  padding: "10px 10px 10px 26px",
                  border: "1px solid #D1D5DB",
                  borderRadius: "0.375rem",
                  boxShadow: "0 1px 2px rgba(0, 0, 0, 0.05)",
                  textIndent: "24px",
                }}
                inputProps={{
                  name: "phone",
                  required: true,
                }}
              />
            </div>
            <div>
              <label
                htmlFor="contacto-secundario"
                className="block text-sm font-medium"
              >
                Contacto Secundario
              </label>
              <PhoneInput
                country={"ar"}
                value={secondaryPhone}
                onChange={setSecondaryPhone}
                inputStyle={{
                  width: "100%",
                  padding: "10px 10px 10px 26px",
                  border: "1px solid #D1D5DB",
                  borderRadius: "0.375rem",
                  boxShadow: "0 1px 2px rgba(0, 0, 0, 0.05)",
                  textIndent: "24px",
                }}
                inputProps={{
                  name: "secondaryPhone",
                  required: true,
                }}
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium">
                Definir Contraseña
              </label>
              <section className="relative">
                <input
                  id="password"
                  className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-secondary-500 focus:border-secondary-500 sm:text-sm"
                  type={passwordVisible ? "text" : "password"}
                  placeholder="Ingrese una contraseña"
                  required
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="absolute inset-y-0 right-0 pr-4 flex items-center"
                >
                  <img
                    src={passwordVisible ? eye_off : eye}
                    alt={
                      passwordVisible
                        ? "Ocultar contraseña"
                        : "Mostrar contraseña"
                    }
                    className="h-4 w-auto"
                  />
                </button>
              </section>
            </div>
            <div>
              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gradient-button focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-secondary-500"
              >
                Registrarse
              </button>
            </div>
          </form>
        </section>
      </section>
    </main>
  );
};

export default Register;
