import { useState, useEffect } from "react";

const NoEditableProfileInfo = () => {
  const [profileData, setProfileData] = useState({
    email: "",
    first_name: "",
    last_name: "",
  });

  useEffect(() => {
    // Cargar los datos desde el localStorage
    const storedEmail = localStorage.getItem("userEmail");
    const storedFirstName = localStorage.getItem("firstName");
    const storedLastName = localStorage.getItem("lastName");

    setProfileData({
      email: storedEmail || "",
      first_name: storedFirstName || "",
      last_name: storedLastName || "",
    });
  }, []);

  return (
    <div className="w-full mt-4">
      <div className="space-y-4">
        <section className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block text-gray-700">Nombre</label>
            <input
              type="text"
              name="first_name"
              value={profileData.first_name}
              disabled
              className="border-gray-300 border rounded w-full p-2 bg-gray-100"
              style={{ height: "40px" }}
            />
          </div>
          <div>
            <label className="block text-gray-700">Apellido</label>
            <input
              type="text"
              name="last_name"
              value={profileData.last_name}
              disabled
              className="border-gray-300 border rounded w-full p-2 bg-gray-100"
              style={{ height: "40px" }}
            />
          </div>
        </section>
        <div>
          <label className="block text-gray-700">Correo Electrónico</label>
          <input
            type="email"
            name="email"
            value={profileData.email}
            disabled
            className="border-gray-300 border rounded w-full p-2 bg-gray-100"
            style={{ height: "40px" }}
          />
        </div>
      </div>
    </div>
  );
};

export default NoEditableProfileInfo;
