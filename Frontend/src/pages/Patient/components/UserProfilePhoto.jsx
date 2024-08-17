import { useState, useEffect } from "react";
import { getUserData } from "../../../services/userServices";

// eslint-disable-next-line react/prop-types
const UserProfilePhoto = ({onClick}) => {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchProfilePhoto = async () => {
      const data = await getUserData();
      setUserData(data);
    };

    fetchProfilePhoto();
  }, []);

  if (!userData) {
    return <div>Loading...</div>; 
  }

  return (
    <div className="cursor-pointer">
      {userData.url_photo ? (
        <img
          src={userData.url_photo}
          alt="profile"
          className="w-full h-auto rounded-full object-cover"
          onClick={onClick}
        />
      ) : (
        <div className="w-[40px] h-[40px] rounded-full bg-magentaButton text-white flex items-center justify-center font-semibold">
          NN
        </div>
      )}
    </div>
  );
};

export default UserProfilePhoto;
