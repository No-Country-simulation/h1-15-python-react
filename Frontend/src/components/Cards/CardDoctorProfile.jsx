/* eslint-disable react/prop-types */

const CardDoctorProfile = ({ doctor }) => {
  return (
    <div className="flex flex-col md:flex-row shadow-card-shadow rounded-lg p-4 text-center bg-[#0001] h-full">
      <img
        src={doctor.url_photo}
        alt={doctor.name}
        className="w-14 h-14 md:w-[150px] md:h-[150px] rounded-full mx-auto md:mx-0"
      />
      <div className="md:ml-4 flex flex-col justify-center">
        <h2 className="text-normal md:text-xl font-semibold text-gray-800 mt-2 md:mt-0">
          Dr. {doctor.name}
        </h2>
        <p className="text-gray-600 text-left">{doctor.specialty}</p>
        <div className="flex flex-wrap justify-center md:justify-start mt-2">
          <span className="text-yellow-500 mr-1">★</span>
          <span className="mr-1">{doctor.rating}</span>
          <span>({doctor.reviews} reseñas)</span>
        </div>
      </div>
    </div>
  );
};

export default CardDoctorProfile;
