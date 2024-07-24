import Icon from "../Icon/Icon";
import SearchBar from "../SearchBar/SearchBar";

const Profile = () => {
  return (
    <div className="mt-4">
      <SearchBar />
      <div className="flex items-center justify-between mt-4">
        <div className="flex-grow" />
        <Icon name="medicine" className="w-6 h-6 text-gray-500" />
        <div className="flex-grow" />
        <img className="w-10 h-10 rounded-full" src="./Bung1.png" alt="Profile" />
      </div>
    </div>
  );
};

export default Profile;
