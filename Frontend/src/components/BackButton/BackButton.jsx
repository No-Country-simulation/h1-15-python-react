import { useNavigate } from "react-router-dom";

const BackButton = () => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <section>
      <button onClick={handleBack} className="flex items-center py-2">
        <img src="/icons/arrowleft.svg" alt="Volver" className="w-6 h-6 mr-2" />
      </button>
    </section>
  );
};

export default BackButton;
