/* eslint-disable react/prop-types */

const AdherenceTable = ({ data }) => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white border border-gray-300">
        <thead>
          <tr>
            <th className="px-4 py-2 border-b-2 border-gray-200 bg-gray-100 text-left text-sm font-semibold text-gray-700">
              Tipo de tratamiento/Medicación
            </th>
            <th className="px-4 py-2 border-b-2 border-gray-200 bg-gray-100 text-left text-sm font-semibold text-gray-700">
              Fecha y hora
            </th>
            <th className="px-4 py-2 border-b-2 border-gray-200 bg-gray-100 text-left text-sm font-semibold text-gray-700">
              Completo SI/NO
            </th>
          </tr>
        </thead>
        <tbody>
          {data.map((row, index) => (
            <tr key={index} className="border-b border-gray-200">
              <td className="px-4 py-2 text-sm text-gray-700">{row.tipo}</td>
              <td className="px-4 py-2 text-sm text-gray-700">{row.fecha}</td>
              <td className="px-4 py-2 text-sm text-gray-700">{row.completo}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AdherenceTable;
