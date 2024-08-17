import { useState, useRef } from "react";
import { Cloudinary } from "@cloudinary/url-gen";
import { auto } from "@cloudinary/url-gen/actions/resize";
import { autoGravity } from "@cloudinary/url-gen/qualifiers/gravity";
import { AdvancedImage } from "@cloudinary/react";
import axios from "axios";
import Icon from "../../../components/Icon/Icon";
import { showToast } from "../../../utils/toast";
import Spinner from "../../../components/Spinner";
import { updateProfilePicture } from "../../../services/userServices";
import UserProfilePhoto from "./UserProfilePhoto";

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
        // Subir imagen a Cloudinary
        const response = await axios.post(CLOUDINARY_URL, formData);
        setImageId(response.data.public_id);
        const secureUrl = response.data.secure_url;

        console.log('Imagen subida con éxito. URL:', secureUrl); 
        showToast('Imagen subida con éxito', 'success');

        // Actualizar la foto de perfil en el servidor
        await updateProfilePicture(secureUrl);
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
          <div className="relative flex w-32 h-32 justify-center items-center rounded-full text-3xl text-white bg-gray-300">
            <UserProfilePhoto onClick={handleClick} />
            <button onClick={handleClick} className="absolute bottom-0">
              <Icon name="IoCameraReverseOutline" />
            </button>
          </div>
        ) : (
          <AdvancedImage cldImg={img} className="w-32 h-32 object-cover rounded-full" />
        )}
        {uploading && <Spinner />}
      </form>
    </div>
  );
};

export default ImageUploader;
