/* eslint-disable react/prop-types */
import { format } from 'date-fns';
import { es } from 'date-fns/locale';

const AdherenceHeader = ({ patient }) => {
  const currentDate = format(new Date(), 'EEEE, dd/MM/yyyy', { locale: es });
  
  return (
    <div className="flex justify-between items-center p-4 bg-gray-50 border-b border-gray-200">
      <div>
        <h1 className="text-5xl font-bold text-gray-900">Adherencia</h1>
        <p className="text-lg text-gray-600">
          Fecha de atención: {patient.attentionDate} - {patient.name}, {patient.age} años
        </p>
      </div>
      <div>
        <p className="text-sm text-gray-600 font-semibold">{currentDate}</p>
      </div>
    </div>
  );
}

export default AdherenceHeader;
