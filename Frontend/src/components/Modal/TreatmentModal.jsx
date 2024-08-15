/* eslint-disable react/prop-types */
import { useState } from "react";
const TreatmentModal = ({ tratamiento, show, setShow }) => {
  const [formData, setFormData] = useState({
    nombre_terapia: tratamiento?.nombre_terapia || "",
    nombre_ejercicio: tratamiento?.nombre_ejercicio || "",
    duracion: tratamiento?.duracion || "",
    objetivo: tratamiento?.objetivo || "",
    frecuencia: tratamiento?.frecuencia || "",
    intensidad: tratamiento?.intensidad || "",

  });
  const handleClose = () => {
    setShow(false);
  };
  if (!show) {
    return null;
  }
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
  };
  return (
    <div className="fixed inset-0 overflow-y-auto" id="terapia_fisica">
      <div className="flex items-center justify-center min-h-screen">
        <div className="bg-white rounded-lg shadow-lg p-6 max-w-md mx-auto z-10 relative w-[120%]">
          <div className="flex flex-col justify-between items-center mb-4">
            <h2 className="text-lg font-bold">Detalles del tratamiento</h2>
            {/**CLOSE BUTTON */}
            <button
              className="text-gray-500 hover:text-gray-700 absolute right-2 top-2"
              onClick={handleClose}
            >
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
            {/**END CLOSE BUTTON */}
            <form
              className="flex flex-col gap-4 py-4 w-full"
              onSubmit={handleSubmit}
            >
              <div className="border border-gray-400 rounded-md relative">
                <input
                  value={formData.nombre_terapia}
                  onChange={handleInputChange}
                  type="text"
                  name="nombre_terapia"
                  id="nombre_terapia"
                  className="appearance-none peer w-full py-2 px-2 outline-1 outline-gray-400"
                />
                <label
                  className={`absolute top-2 left-2 px-1 ${formData.nombre_terapia ? "-translate-y-6 scale-75 bg-white" : "peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:bg-white"} transition-all duration-300`}
                  htmlFor="nombre_terapia"
                >
                  Nombre del tratamiento
                </label>
              </div>
              <div className="border border-gray-400 rounded-md relative">
                <input
                  value={formData.nombre_ejercicio}
                  type="text"
                  name="nombre_ejercicio"
                  id="nombre_ejercicio"
                  onChange={handleInputChange}
                  className="appearance-none peer w-full py-2 px-2 outline-1 outline-gray-400"
                />
                <label
                  className={`absolute top-2 left-2 px-1 ${formData.nombre_ejercicio ? "-translate-y-6 scale-75 bg-white" : "peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:bg-white"} transition-all duration-300`}
                  htmlFor="nombre_ejercicio"
                >
                  Nombre del ejercicio
                </label>
              </div>
              <div className="flex justify-between">
                <label htmlFor="duracion">Duración:</label>
                <div>
                  <input
                    className="border border-gray-400 rounded-md w-16 text-end outline-1 outline-gray-400"
                    type="number"
                    min={1}
                    max={60}
                    name="duracion"
                    id="duracion"
                    value={formData.duracion}
                    onChange={handleInputChange}
                  />
                  <span> minutos</span>
                </div>
              </div>
              <div className="flex justify-between">
                <label htmlFor="frecuencia">Frecuencia:</label>
                <div>
                  <input
                    value={formData.frecuencia}
                    onChange={handleInputChange}
                    type="number"
                    max={7}
                    min={1}
                    name="frecuencia"
                    id="frecuencia"
                    className="border border-gray-400 rounded-md w-12 text-end outline-1 outline-gray-400"
                  />
                  <span> veces por semana</span>
                </div>
              </div>
              <div className="w-full flex justify-between">
                <label htmlFor="intensidad">Nivel de intensidad:</label>
                <select
                  name="intensidad"
                  id="intensidad"
                  className="border border-gray-400 rounded-md"
                  value={formData.intensidad}
                  onChange={handleInputChange}
                >
                  <option value={0}>Leve</option>
                  <option value={1}>Moderado</option>
                  <option value={2}>Intenso</option>
                </select>
              </div>
              <div className="rounded-md relative">
                <textarea
                  value={formData.descripcion}
                  className="appearance-none peer w-full h-fit border border-gray-400 p-1 outline-1 outline-gray-400"
                  type="text"
                  name="objetivo"
                  id="objetivo"
                  onChange={handleInputChange}
                />
                <label
                  htmlFor="objetivo"
                  className={`absolute top-2 left-2 px-1 ${formData.objetivo ? "-translate-y-6 scale-75 bg-white" : "peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:bg-white"} transition-all duration-300`}
                >
                  Objetivo
                </label>
              </div>
              <button className="bg-blue-400 hover:bg-blue-500 text-white px-2 py-1 rounded-lg w-1/2 self-center hover:cursor-pointer hover:shadow-xl active:bg-blue-800 active:shadow-inner">
                Crear
              </button>
            </form>
          </div>
        </div>
      </div>
      <div className="fixed inset-0 bg-gray-400 bg-opacity-50 backdrop-blur-sm"></div>
    </div>
  );
};

export default TreatmentModal;
