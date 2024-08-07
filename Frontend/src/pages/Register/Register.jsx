import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useLanguage from "../../hooks/useLanguage";
import { registerUser } from "../../services/auth";
import showDialog from "../../utils/showDialog";

const Register = () => {
  const [formData, setFormData] = useState({
    email: "",
    first_name: "",
    last_name: "",
    user_types: 1,
    is_active: true,
  });

  const navigate = useNavigate();
  const languageData = useLanguage();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === "user_types" ? Number(value) : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await registerUser(formData);


      await showDialog(
        languageData.register.registrationSuccessTitle,
        languageData.register.registrationSuccessMessage,
        "success",
        "#00ADDE",
        false,
        3000,
      );

      navigate("/login");
    } catch (error) {
      await showDialog(
        languageData.register.errorTitle,
        error.message,
        "error",
        "#FF0000",
        false,
        3000,
      );
      console.error(error);
    }
  };

  const handleLoginClick = () => {
    navigate("/login");
  };

  if (!languageData) {
    return <div>Loading data...</div>;
  }

  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-4 bg-gradient-background_1">
      <section className="cursor-pointer max-w-[206px]">
        <img onClick={() => navigate("/")} src="/justinaLogo.webp" alt="logo" />
      </section>
      <section className="flex flex-col justify-center w-full p-6 bg-white shadow-lg rounded-lg lg:max-w-[548px]">
        <h1 className="text-2xl font-bold text-center">
          {languageData.register.title}
        </h1>
        <p className="mt-6 text-center text-sm text-text_primary">
          {languageData.register.alreadyHaveAccount}
          <span
            onClick={handleLoginClick}
            className="ml-1 text-text_secondary font-semibold cursor-pointer"
          >
            {languageData.register.login}
          </span>
        </p>
        <section className="flex flex-col justify-center w-full pt-6">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="flex flex-col md:flex-row space-y-4 md:space-x-9 md:space-y-0">
              <div className="flex-1">
                <label
                  htmlFor="first_name"
                  className="block text-sm font-medium"
                >
                  {languageData.register.firstNameLabel}
                </label>
                <input
                  id="first_name"
                  name="first_name"
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-secondary-500 focus:border-secondary-500 sm:text-sm"
                  type="text"
                  placeholder={languageData.register.firstNamePlaceholder}
                  value={formData.first_name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="flex-1">
                <label
                  htmlFor="last_name"
                  className="block text-sm font-medium"
                >
                  {languageData.register.lastNameLabel}
                </label>
                <input
                  id="last_name"
                  name="last_name"
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-secondary-500 focus:border-secondary-500 sm:text-sm"
                  type="text"
                  placeholder={languageData.register.lastNamePlaceholder}
                  value={formData.last_name}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium">
                {languageData.register.emailLabel}
              </label>
              <input
                id="email"
                name="email"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-secondary-500 focus:border-secondary-500 sm:text-sm"
                type="email"
                placeholder={languageData.register.emailPlaceholder}
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium pb-2">
                {languageData.register.roleLabel}
              </label>
              <div className="mt-1">
                <label className="inline-flex items-center">
                  <input
                    type="radio"
                    name="user_types"
                    value={1}
                    checked={formData.user_types === 1}
                    onChange={handleChange}
                    className="form-radio text-secondary-500"
                  />
                  <span className="ml-2 text-sm">
                    {languageData.register.patientRole}
                  </span>
                </label>
                <label className="inline-flex items-center">
                  <input
                    type="radio"
                    name="user_types"
                    value={2}
                    checked={formData.user_types === 2}
                    onChange={handleChange}
                    className="form-radio text-secondary-500 sm:text-sm"
                  />
                  <span className="ml-2 text-sm">
                    {languageData.register.doctorRole}
                  </span>
                </label>
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="w-full py-2 text-sm font-medium text-white bg-gradient-button rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-secondary-500"
              >
                {languageData.register.registerButton}
              </button>
            </div>
          </form>
        </section>
      </section>
    </main>
  );
};

export default Register;
