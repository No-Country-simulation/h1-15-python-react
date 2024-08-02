import { useNavigate } from 'react-router-dom';

// eslint-disable-next-line react/prop-types
const AddItemButton = ({ to, label }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(to);
  };

  return (
    <button
      onClick={handleClick}
      className="relative w-16 h-16 bg-Justina_3 text-white rounded-full transition-all duration-300 hover:w-40 group shadow-lg"
    >
      <div className="absolute inset-0 flex items-center justify-center group-hover:hidden">
        <span className="text-4xl">+</span>
      </div>
      
      <div className="absolute inset-0 flex items-center justify-start pl-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-hover:flex">
        <span className="text-4xl">+</span>
        <span className="ml-2 whitespace-nowrap">{label}</span>
      </div>
    </button>
  );
};

export default AddItemButton;
