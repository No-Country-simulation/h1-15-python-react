const MedicalHistoryForm = () => {
  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-center text-2xl font-bold mb-6">
        Antecedentes Médicos
      </h1>

      <div className="grid grid-cols-2 gap-4 mb-4">
        {/* Columna Izquierda */}
        <div className="flex flex-col">
          <label className="flex items-center space-x-2">
            <input type="checkbox" className="form-checkbox text-blue-500" />
            <span>Bebe</span>
          </label>
          <label className="flex items-center space-x-2">
            <input type="checkbox" className="form-checkbox text-blue-500" />
            <span>Fuma</span>
          </label>
          <label className="flex items-center space-x-2">
            <input type="checkbox" className="form-checkbox text-blue-500" />
            <span>Utiliza Drogas Psicotropicas</span>
          </label>
          <label className="flex items-center space-x-2">
            <input type="checkbox" className="form-checkbox text-blue-500" />
            <span>Anemia</span>
          </label>
          <label className="flex items-center space-x-2">
            <input type="checkbox" className="form-checkbox text-blue-500" />
            <span>Asma</span>
          </label>
          <label className="flex items-center space-x-2">
            <input type="checkbox" className="form-checkbox text-blue-500" />
            <span>Cáncer</span>
          </label>
          <label className="flex items-center space-x-2">
            <input type="checkbox" className="form-checkbox text-blue-500" />
            <span>Coágulos sanguíneos (Por ej. una trombosis)</span>
          </label>
          <label className="flex items-center space-x-2">
            <input type="checkbox" className="form-checkbox text-blue-500" />
            <span>Colitis</span>
          </label>
          <label className="flex items-center space-x-2">
            <input type="checkbox" className="form-checkbox text-blue-500" />
            <span>Conmoción Cerebral</span>
          </label>
          <label className="flex items-center space-x-2">
            <input type="checkbox" className="form-checkbox text-blue-500" />
            <span>Depresión</span>
          </label>
          <label className="flex items-center space-x-2">
            <input type="checkbox" className="form-checkbox text-blue-500" />
            <span>Diabetes</span>
          </label>
          <label className="flex items-center space-x-2">
            <input type="checkbox" className="form-checkbox text-blue-500" />
            <span>Enfermedades Cardiacas</span>
          </label>
          <label className="flex items-center space-x-2">
            <input type="checkbox" className="form-checkbox text-blue-500" />
            <span>Enfermedades de transmisión sexual (ETS)</span>
          </label>
        </div>

        {/* Columna Derecha */}
        <div className="flex flex-col">
          <label className="flex items-center space-x-2">
            <input type="checkbox" className="form-checkbox text-blue-500" />
            <span>Enfermedad hepática</span>
          </label>
          <label className="flex items-center space-x-2">
            <input type="checkbox" className="form-checkbox text-blue-500" />
            <span>Enfermedad pulmonar</span>
          </label>
          <label className="flex items-center space-x-2">
            <input type="checkbox" className="form-checkbox text-blue-500" />
            <span>Hepatitis</span>
          </label>
          <label className="flex items-center space-x-2">
            <input type="checkbox" className="form-checkbox text-blue-500" />
            <span>Infección de las vías urinarias</span>
          </label>
          <label className="flex items-center space-x-2">
            <input type="checkbox" className="form-checkbox text-blue-500" />
            <span>Migranas</span>
          </label>
          <label className="flex items-center space-x-2">
            <input type="checkbox" className="form-checkbox text-blue-500" />
            <span>Movilidad limitada</span>
          </label>
          <label className="flex items-center space-x-2">
            <input type="checkbox" className="form-checkbox text-blue-500" />
            <span>Nivel alto de colesterol</span>
          </label>
          <label className="flex items-center space-x-2">
            <input type="checkbox" className="form-checkbox text-blue-500" />
            <span>Presión arterial alta</span>
          </label>
          <label className="flex items-center space-x-2">
            <input type="checkbox" className="form-checkbox text-blue-500" />
            <span>Síndrome del intestino irritable</span>
          </label>
          <label className="flex items-center space-x-2">
            <input type="checkbox" className="form-checkbox text-blue-500" />
            <span>VIH/SIDA</span>
          </label>
        </div>
      </div>

      <div className="mb-4">
        <div>
          <label className="block text-sm font-medium mb-1">Otras</label>
          <input
            type="text"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg outline-none bg-inherit"
            placeholder="Escriba otras condiciones"
          />
        </div>
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Alergias</label>
        <input
          type="text"
          className="w-full px-3 py-2 border border-gray-300 rounded-lg outline-none bg-inherit"
          placeholder="Escriba y separe con comas"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Medicamentos</label>
        <input
          type="text"
          className="w-full px-3 py-2 border border-gray-300 rounded-lg outline-none bg-inherit"
          placeholder="Escriba y separe con comas"
        />
      </div>
    </div>
  );
};

export default MedicalHistoryForm;
