import { useState, useRef } from "react";
import { Cloudinary } from "@cloudinary/url-gen";
import { auto } from "@cloudinary/url-gen/actions/resize";
import { autoGravity } from "@cloudinary/url-gen/qualifiers/gravity";
import { AdvancedImage } from "@cloudinary/react";
import axios from "axios";
import UserInitials from "../../../components/UserInitials";
import Icon from "../../../components/Icon/Icon";
import { showToast } from "../../../utils/toast";
import Spinner from "../../../components/Spinner";

const CLOUD_NAME = 'dzllpjhiv';
const CLOUDINARY_URL = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`;
const CLOUDINARY_UPLOAD_PRESET = "justina";

const ImageUploader = () => {
  const [imageId, setImageId] = useState(null);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef(null);

  const handleImageUpload = async (event) => {
    event.preventDefault(); 

    const file = event.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);

      setUploading(true);
      try {
        const response = await axios.post(CLOUDINARY_URL, formData);
        setImageId(response.data.public_id);
        console.log('Imagen subida con éxito. URL:', response.data.secure_url); 
        showToast('Imagen subida con éxito', 'success');
      } catch (error) {
        console.error("Error subiendo la imagen:", error);
        showToast('Error subiendo la imagen', 'error');
      } finally {
        setUploading(false);
      }
    }
  };

  const handleClick = () => {
    fileInputRef.current.click();
  };

  const cld = new Cloudinary({ cloud: { cloudName: CLOUD_NAME } });

  const img = imageId
    ? cld.image(imageId).format('auto').quality('auto').resize(
        auto().gravity(autoGravity()).width(120).height(120)
      )
    : null;

  return (
    <div className="flex flex-col items-center">
      <form onSubmit={handleImageUpload}> 
        <input
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          ref={fileInputRef}
          className="hidden"
        />
        {!img ? (
          <div className="relative flex w-[120px] h-[120px] bg-magentaButton text-4xl justify-center items-center rounded-full text-white">
            <UserInitials onClick={handleClick} />
            <button onClick={handleClick} className="absolute bottom-0">
              <Icon name="IoCameraReverseOutline" />
            </button>
          </div>
        ) : (
          <AdvancedImage cldImg={img} className="w-30 h-30 object-cover rounded-full" />
        )}
        {uploading && <Spinner/>}
      </form>
    </div>
  );
};

export default ImageUploader;
