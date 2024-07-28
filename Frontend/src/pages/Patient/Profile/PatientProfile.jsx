import BackButton from "../../../components/BackButton/BackButton";
import FooterNav from "../../../components/FooterNav/FooterNav";
import patientData from "../../../data/PatientProfile.json";

const PatientProfile = () => {
  return (
    <section className="grid max-w-lg w-full mx-auto p-2 font-josefin">
      <section>
        <BackButton />
      </section>
      <div className=" bg-white rounded-xl shadow-md overflow-hidden">
        <div className="flex flex-col">
          <div className="w-full flex justify-center">
            <img
              className="w-70% object-cover md:w-48"
              src={patientData.photo}
              alt={patientData.name}
            />
          </div>
          <div className="p-4">
            <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">
              {patientData.profession}
            </div>
            <h1 className="block mt-1 text-lg leading-tight font-medium text-black">
              {patientData.name}
            </h1>
            <p className="mt-2 text-gray-500">{patientData.bio}</p>
            <div className="mt-4">
              <span className="text-gray-700 font-bold">Age:</span>{" "}
              {patientData.age}
            </div>
            <div className="mt-2">
              <span className="text-gray-700 font-bold">Contact:</span>{" "}
              {patientData.contact}
            </div>
          </div>
        </div>
      </div>
      <section>
        <FooterNav />
      </section>
    </section>
  );
};

export default PatientProfile;
