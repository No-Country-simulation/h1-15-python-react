import Icon from "../Icon/Icon";

const FooterNav = () => {
  return (
    <div className="max-w-lg mx-auto fixed bottom-0 left-0 right-0 bg-Justina_1 text-white flex justify-around items-center px-[6px] shadow-lg">
      <div className="p-4 hover:rounded-[10px] hover:bg-gray-200 hover:bg-opacity-20 transition-colors duration-300 cursor-pointer">
        <Icon name="profile" />
      </div>
      <div className="p-4 hover:rounded-[10px] hover:bg-gray-200 hover:bg-opacity-20 transition-colors duration-300 cursor-pointer">
        <Icon name="clipboard" />
      </div>
      <div className="p-4 hover:rounded-[10px] hover:bg-gray-200 hover:bg-opacity-20 transition-colors duration-300 cursor-pointer">
        <Icon name="medicinewhite" />
      </div>
      <div className="p-4 hover:rounded-[10px] hover:bg-gray-200 hover:bg-opacity-20 transition-colors duration-300 cursor-pointer">
        <Icon name="hands" />
      </div>
      <div className="p-4 hover:rounded-[10px] hover:bg-gray-200 hover:bg-opacity-20 transition-colors duration-300 cursor-pointer">
        <Icon name="calendar" />
      </div>
    </div>
  );
};

export default FooterNav;
