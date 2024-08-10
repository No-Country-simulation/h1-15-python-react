/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import { showToast } from "../../utils/toast";
import { ToastContainer } from "react-toastify";
import data from "../../data/insurance_companies.json";
import { activatePatient } from "../../services/patientService";
import 'react-toastify/dist/ReactToastify.css'; // Asegúrate de importar los estilos

const ActivePatient = ({ onComplete }) => {
  const [userId, setUserId] = useState(null);
  const [financerId, setFinancerId] = useState(null);
  const [affiliateCode, setAffiliateCode] = useState("");
  const [plan, setPlan] = useState("");

  useEffect(() => {
    const storedUserId = localStorage.getItem("userId");
    setUserId(storedUserId ? Number(storedUserId) : null);
  }, []);

  const handleFinancerChange = (e) => {
    const selectedName = e.target.value;
    const selectedFinancer = insuranceCompanies.find(
      (financer) => financer.name === selectedName
    );
    setFinancerId(selectedFinancer ? selectedFinancer.id : null);
    setPlan("");
  };

  const handleAffiliateCodeChange = (e) => {
    setAffiliateCode(e.target.value);
  };

  const handlePlanChange = (e) => {
    setPlan(e.target.value);
  };

  const handleSave = async () => {
    // Verificar que todos los campos están completos
    if (!userId || !financerId || !affiliateCode || !plan) {
      showToast("Todos los campos son obligatorios", "error");
      return;
    }

    const payload = {
      user_id: userId,
      financer_id: financerId,
      affiliate_code: affiliateCode,
      plan: plan,
    };

    try {
      await activatePatient(payload);
      showToast("Paciente activado con éxito", "success");
      onComplete();
    } catch (error) {
      showToast("Error al activar el paciente", "error");
    }
  };

  const insuranceCompanies = data.insurance_companies;
  const selectedFinancer = insuranceCompanies.find(
    (financer) => financer.id === financerId
  );

  return (
    <div>
      <ToastContainer />
      <h2 className="text-xl font-semibold mb-4">
        Registro de Información del Seguro
      </h2>
      <p className="text-sm pb-4">
        * Completar estos datos ayuda a gestionar y confirmar tu seguro médico,
        asegurando que tus necesidades de salud estén correctamente cubiertas.
      </p>
      <div className="mb-4">
        <label htmlFor="financer" className="block text-sm font-medium mb-1">
          Aseguradora
        </label>
        <select
          id="financer"
          value={
            financerId
              ? insuranceCompanies.find(
                  (financer) => financer.id === financerId
                )?.name
              : ""
          }
          onChange={handleFinancerChange}
          className="border border-gray-300 rounded w-full h-[2.5rem] text-sm px-3"
          required
        >
          <option value="">Seleccionar Aseguradora</option>
          {insuranceCompanies.map((financier) => (
            <option key={financier.id} value={financier.name}>
              {financier.name}
            </option>
          ))}
        </select>
      </div>

      {selectedFinancer && (
        <div className="mb-4">
          <label htmlFor="plan" className="block text-sm font-medium mb-1">
            Plan
          </label>
          <select
            id="plan"
            value={plan}
            onChange={handlePlanChange}
            className="border border-gray-300 rounded w-full h-[2.5rem] text-sm px-3"
            required
          >
            <option value="">Seleccionar Plan</option>
            {selectedFinancer.plans.map((plan) => (
              <option key={plan.id} value={plan.name}>
                {plan.name} - {plan.coverage} ({plan.price})
              </option>
            ))}
          </select>
        </div>
      )}

      <div className="mb-4">
        <label
          htmlFor="affiliateCode"
          className="block text-sm font-medium mb-1"
        >
          Código de Afiliado
        </label>
        <input
          id="affiliateCode"
          type="text"
          value={affiliateCode}
          onChange={handleAffiliateCodeChange}
          placeholder="Ingrese su código de afiliado"
          className="border border-gray-300 rounded w-full h-[2.5rem] text-sm px-3"
          required
        />
      </div>

      <button
        onClick={handleSave}
        className="bg-magentaButton text-white rounded w-full h-[2.5rem] text-sm"
      >
        Guardar
      </button>
    </div>
  );
};

export default ActivePatient;
