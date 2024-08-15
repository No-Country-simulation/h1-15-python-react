import { useState, useEffect } from "react";
import FooterNav from "../../../components/FooterNav/FooterNav";
import LateralMenu from "../components/LateralMenu";
import EditableProfileInfo from "../components/EditableProfileInfo";
import {
  createPatientProfile,
  verifyUserStatus,
  getPatientProfile,
} from "../../../services/patientService";
import ImageUploader from "../components/ImageUploader";
import { useNavigate } from "react-router-dom";
import showDialog from "../../../utils/showDialog";
import ReadOnlyProfile from "./ReadOnlyProfile";
import { showToast } from "../../../utils/toast";
import { ToastContainer } from "react-toastify";
import NoEditableProfileInfo from "../components/NoEditableProfileInfo";
import Spinner from "../../../components/Spinner";

const PatientProfile = () => {
  const [formData, setFormData] = useState({
    patient_id: "",
    address: "",
    document_number: "",
    birth_date: "",
    gender: "",
    phone_number: "",
    phone_number_2: "",
    emergency_contact: "",
    blood_type: "",
    about_me: "",
    is_active: true,
    document_type: "",
  });

  const [isAddressInputVisible, setAddressInputVisible] = useState(false);
  const [loadingProfile, setLoadingProfile] = useState(true);
  const [isDataAvailable, setIsDataAvailable] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const verifyPatient = async () => {
      try {
        const authToken = localStorage.getItem("authToken");
        if (authToken) {
          const response = await verifyUserStatus(authToken);
          if (response.is_patient) {
            setFormData((prevData) => ({
              ...prevData,
              patient_id: response.patient_id,
            }));

            const patientProfile = await getPatientProfile();
            setFormData((prevData) => ({
              ...prevData,
              ...patientProfile,
            }));

            setIsDataAvailable(
              patientProfile && Object.keys(patientProfile).length > 0,
            );
          } else {
            await showDialog(
              "Información faltante",
              "Primero debes completar los datos de tu seguro",
              "info",
              "#00ADDE",
              false,
              3000,
            );
            setTimeout(() => {
              navigate("/patient");
            }, 3000);
          }
        }
      } catch (error) {
        console.error("Error al verificar el estado del paciente:", error);
      } finally {
        setLoadingProfile(false); 
      }
    };

    verifyPatient();
  }, [navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handlePhoneChange = (value, name) => {
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleDictate = (text) => {
    setFormData({
      ...formData,
      about_me: text,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.address || !formData.phone_number) {
      showToast("Por favor completa todos los campos obligatorios", "error");
      return;
    }

    try {
      await createPatientProfile(formData);
      showToast("Perfil actualizado exitosamente", "success");

      setFormData({
        patient_id: "",
        address: "",
        document_number: "",
        birth_date: "",
        gender: "",
        phone_number: "",
        phone_number_2: "",
        emergency_contact: "",
        blood_type: "",
        about_me: "",
        is_active: true,
        document_type: "",
      });
    } catch (error) {
      console.error("Error al actualizar el perfil:", error);
      showToast("Error al actualizar el perfil", "error");
    }
  };

  return (
    <>
      <ToastContainer />
      <main className="h-screen flex flex-col max-w-screen-lg mx-auto px-4">
        <LateralMenu />
        <ImageUploader />
        <NoEditableProfileInfo/>
        <section>
          {loadingProfile ? (
            <Spinner/> 
          ) : isDataAvailable ? (
            <ReadOnlyProfile formData={formData} />
          ) : (
            <EditableProfileInfo
              formData={formData}
              handleChange={handleChange}
              handlePhoneChange={handlePhoneChange}
              handleDictate={handleDictate}
              isAddressInputVisible={isAddressInputVisible}
              setAddressInputVisible={setAddressInputVisible}
              handleSubmit={handleSubmit}
            />
          )}
          <FooterNav />
        </section>
      </main>
    </>
  );
};

export default PatientProfile;
