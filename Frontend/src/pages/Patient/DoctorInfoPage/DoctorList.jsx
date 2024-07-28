import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import CardDoctorProfile from "../../../components/Cards/CardDoctorProfile";
import Icon from "../../../components/Icon/Icon";
import doctorsData from "../../../data/patientDataDoctors.json";
import FooterNav from "../../../components/FooterNav/FooterNav";

function DoctorList() {
  const [searchTerm, setSearchTerm] = useState("");
  const [doctors, setDoctors] = useState([]);

  useEffect(() => {
    setDoctors(doctorsData);
  }, []);

  const filteredDoctors = doctors.filter(
    (doctor) =>
      doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doctor.specialty.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <div className="max-w-lg mx-auto p-4 grid gap-4">
      <section className="flex mb-4">
        <input
          type="text"
          placeholder="Busca por nombre del médico o especialista"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="flex-grow p-2 border border-gray-300 rounded-l outline-none h-10"
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
              <CardDoctorProfile doctor={doctor} />
            </Link>
          ))
        ) : (
          <div className="col-span-2 text-center text-gray-500">
            No hay registros para tu búsqueda.
          </div>
        )}
      </section>
      <section>
        <FooterNav />
      </section>
    </div>
  );
}

export default DoctorList;
