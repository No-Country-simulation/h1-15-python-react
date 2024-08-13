import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import CardDoctorProfile from "../../../components/Cards/CardDoctorProfile";
import Icon from "../../../components/Icon/Icon";
import FooterNav from "../../../components/FooterNav/FooterNav";
import BackButton from "../../../components/BackButton/BackButton";
import PopupMessage from "../../../components/PopupMessage";
import { getDoctorDataAll } from "../../../services/doctorService";
import useLanguage from "../../../hooks/useLanguage";

function DoctorList() {
  const [searchTerm, setSearchTerm] = useState("");
  const [doctors, setDoctors] = useState([]);
  const [isPopupOpen, setIsPopupOpen] = useState(true);
  const languageData = useLanguage();

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const data = await getDoctorDataAll();
        setDoctors(data);
      } catch (error) {
        console.error("Error fetching doctor data:", error);
      }
    };

    fetchDoctors();
  }, []);

  const filteredDoctors = doctors.filter(
    (doctor) =>
      doctor.user.first_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doctor.user.last_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doctor.specialty.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleClosePopup = () => {
    setIsPopupOpen(false);
  };

  if (!languageData) {
    return <div>Cargando datos...</div>;
  }

  return (
    <div className="max-w-screen-lg mx-auto p-4 grid gap-4">
      <BackButton />
      <section className="flex mb-4">
        <input
          type="text"
          placeholder={languageData.doctorList.placeholder}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="flex-grow p-2 border border-gray-300 rounded-lg outline-none h-10 text-sm md:text-lg"
        />
        <button className="p-2 rounded-r">
          <Icon name="search" />
        </button>
      </section>
      <section className="grid grid-cols-2 gap-4 pb-20">
        {filteredDoctors.length > 0 ? (
          filteredDoctors.map((doctor) => (
            <Link
              to={`/patient/doctor-information/${doctor.id}`}
              key={doctor.id}
            >
              <CardDoctorProfile
                doctor={{
                  name: `${doctor.user.first_name} ${doctor.user.last_name}`,
                  specialty: doctor.specialty,
                  reviews: doctor.reviews,
                  rating: doctor.rating,
                  url_photo:doctor.user.url_photo
                }}
              />
            </Link>
          ))
        ) : (
          <div className="col-span-2 text-center text-gray-500">
            No hay registros para tu búsqueda.
          </div>
        )}
      </section>
      <FooterNav />
      <PopupMessage isOpen={isPopupOpen} onClose={handleClosePopup} />
    </div>
  );
}

export default DoctorList;
