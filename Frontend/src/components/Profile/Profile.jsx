import Icon from "../Icon/Icon";

// eslint-disable-next-line react/prop-types
const Profile = ({icon_name, greeting}) => {
  return (
    <div className="mt-4">
      <div className="flex items-center justify-between mt-4">
        <div className="flex-grow" />
        <Icon name={icon_name}/>
        <div className="flex-grow" />
        <img className="w-10 h-10 rounded-full" src="./Bung1.png" alt="Profile" />
      </div>
      <h1 className="font-sans text-3xl font-light m-8 text-center">
        {greeting}
        </h1>
    </div>
  );
};

export default Profile;
