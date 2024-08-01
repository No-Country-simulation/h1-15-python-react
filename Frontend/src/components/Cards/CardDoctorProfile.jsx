/* eslint-disable react/prop-types */

const CardDoctorProfile = ({ doctor }) => {
  return (
    <div className="bg-[#CAD6FF] shadow-lg rounded-lg p-4 text-center">
      <img
        src={doctor.photo}
        alt={doctor.name}
        className="w-14 h-14 rounded-full mx-auto"
      />
      <h2 className="text-xl font-semibold text-gray-800 mt-2">
        {doctor.name}
      </h2>
      <p className="text-gray-600">{doctor.specialty}</p>
      <div className="flex items-center mt-2">
        <span className="text-yellow-500 mr-1">★</span>
        <span className="mr-2">{doctor.rating}</span>
        <span>({doctor.reviews} reseñas)</span>
      </div>
    </div>
  );
};
export default CardDoctorProfile;
