/* eslint-disable react/prop-types */
import Icon from "../../../components/Icon/Icon";

const MenuButton = ({ onToggleSidebar }) => {
  return (
    <button onClick={onToggleSidebar} className="text-white">
      <Icon name="bars" />
    </button>
  );
};

export default MenuButton;
