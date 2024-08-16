/* eslint-disable react/prop-types */
const AdherenceCard = ({ title, description, percentage }) => {
  const radius = 45; 
  const circumference = 2 * Math.PI * radius;
  const strokeDasharray = `${(percentage / 100) * circumference} ${circumference}`;

  // Establece el color basado en el porcentaje
  const color = percentage >= 50 ? "#00D1C1" : "#D22B8B";

  return (
    <div className="flex flex-col items-center justify-center p-4">
      <h2 className="text-2xl font-semibold text-gray-800">{title}</h2>
      <p className="text-lg text-gray-500">{description}</p>
      <div className="relative w-48 h-48 my-4"> 
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-4xl font-bold text-gray-900">{percentage}%</span>
        </div>
        <svg className="w-full h-full" viewBox="0 0 100 100">
          <circle
            className="text-gray-300"
            cx="50"
            cy="50"
            r={radius}
            fill="none"
            stroke="currentColor"
            strokeWidth="10"
          />
          <circle
            cx="50"
            cy="50"
            r={radius}
            fill="none"
            stroke={color}
            strokeWidth="10"
            strokeDasharray={strokeDasharray}
            strokeLinecap="round"
            transform="rotate(-90 50 50)"
          />
        </svg>
      </div>
    </div>
  );
};

export default AdherenceCard;
