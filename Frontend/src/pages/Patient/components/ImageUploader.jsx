import { useState, useRef } from "react";
import UserInitials from "../../../components/UserInitials";
import Icon from "../../../components/Icon/Icon";

const ImageUploader = () => {
  const [image, setImage] = useState(null);
  const fileInputRef = useRef(null);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleClick = () => {
    fileInputRef.current.click();
  };

  return (
    <div className="flex flex-col items-center">
      <input
        type="file"
        accept="image/*"
        onChange={handleImageUpload}
        ref={fileInputRef}
        className="hidden"
      />
      {!image ? (
        <div className="relative flex w-[120px] h-[120px] bg-magentaButton text-4xl justify-center items-center rounded-full text-white">
          <UserInitials onClick={handleClick} />
          <button onClick={handleClick} className="absolute bottom-0">
            <Icon name="IoCameraReverseOutline"   />
          </button>
        </div>
      ) : (
        <img
          src={image}
          alt="Uploaded"
          className="w-30 h-30 object-cover rounded-full"
          style={{ width: "120px", height: "120px" }}
        />
      )}
    </div>
  );
};

export default ImageUploader;
