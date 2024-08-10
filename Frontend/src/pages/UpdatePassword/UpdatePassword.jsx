import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useLanguage from "../../hooks/useLanguage";
import { updatePassword } from "../../services/auth";
import eye from "/icons/eye.svg";
import eye_off from "/icons/eye_off.svg";
import { validatePassword } from "../../utils/validatePassword";

const UpdatePassword = () => {
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [newPasswordVisible, setNewPasswordVisible] = useState(false);
  const [confirmNewPasswordVisible, setConfirmNewPasswordVisible] =
    useState(false);
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const navigate = useNavigate();
  const languageData = useLanguage();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setPasswordError("");
    setConfirmPasswordError("");

    const validationMessage = validatePassword(
      newPassword,
      languageData.updatePassword,
    );
    if (validationMessage) {
      setPasswordError(validationMessage);
      return;
    }

    if (newPassword !== confirmNewPassword) {
      setConfirmPasswordError(languageData.updatePassword.passwordMismatch);
      return;
    }

    try {
      await updatePassword(newPassword);
      navigate("/login");
    } catch (error) {
      console.error("Error updating password:", error);
      setPasswordError(
        error.message || languageData.updatePassword.errorUpdatingPassword,
      );
    }
  };

  if (!languageData) {
    return <div>Cargando datos...</div>;
  }

  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-4 bg-gradient-background_1">
      <section className="cursor-pointer max-w-[206px]">
        <img onClick={() => navigate("/")} src="/justinaLogo.webp" alt="logo" />
      </section>
      <section className="flex flex-col justify-center w-full p-6 bg-white shadow-lg rounded-lg lg:max-w-[548px]">
        <h1 className="text-2xl font-bold text-center">
          {languageData.updatePassword.title}
        </h1>
        <form className="flex flex-col space-y-6 mt-6" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="new-password" className="block text-sm font-medium">
              {languageData.updatePassword.newPasswordLabel}
            </label>
            <div className="relative">
              <input
                id="new-password"
                type={newPasswordVisible ? "text" : "password"}
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
                placeholder={languageData.updatePassword.newPasswordPlaceholder}
                className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-secondary-500 focus:border-secondary-500 sm:text-sm"
              />
              <button
                type="button"
                onClick={() => setNewPasswordVisible((prev) => !prev)}
                className="absolute inset-y-0 right-0 flex items-center pr-4"
              >
                <img
                  src={newPasswordVisible ? eye_off : eye}
                  alt={
                    newPasswordVisible
                      ? languageData.updatePassword.eyeAltHide
                      : languageData.updatePassword.eyeAltShow
                  }
                  className="w-4 h-4"
                />
              </button>
            </div>
            {passwordError && (
              <p className="mt-2 text-sm text-red-600">{passwordError}</p>
            )}
          </div>
          <div>
            <label
              htmlFor="confirm-new-password"
              className="block text-sm font-medium"
            >
              {languageData.updatePassword.confirmNewPasswordLabel}
            </label>
            <div className="relative">
              <input
                id="confirm-new-password"
                type={confirmNewPasswordVisible ? "text" : "password"}
                value={confirmNewPassword}
                onChange={(e) => setConfirmNewPassword(e.target.value)}
                required
                placeholder={
                  languageData.updatePassword.confirmNewPasswordPlaceholder
                }
                className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-secondary-500 focus:border-secondary-500 sm:text-sm"
              />
              <button
                type="button"
                onClick={() => setConfirmNewPasswordVisible((prev) => !prev)}
                className="absolute inset-y-0 right-0 flex items-center pr-4"
              >
                <img
                  src={confirmNewPasswordVisible ? eye_off : eye}
                  alt={
                    confirmNewPasswordVisible
                      ? languageData.updatePassword.eyeAltHide
                      : languageData.updatePassword.eyeAltShow
                  }
                  className="w-4 h-4"
                />
              </button>
            </div>
            {confirmPasswordError && (
              <p className="mt-2 text-sm text-red-600">
                {confirmPasswordError}
              </p>
            )}
          </div>
          <button
            type="submit"
            className="w-full py-2 text-sm font-medium text-white bg-gradient-button rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-secondary-500"
          >
            {languageData.updatePassword.updateButton}
          </button>
          <p className="mt-4 text-sm text-center">
            <span
              onClick={() => navigate("/login")}
              className="font-semibold cursor-pointer text-text_secondary"
            >
              {languageData.updatePassword.backToLogin}
            </span>
          </p>
        </form>
      </section>
    </main>
  );
};

export default UpdatePassword;
