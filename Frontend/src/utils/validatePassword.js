export const validatePassword = (password, messages) => {
  const minLength = 8;
  const hasUpperCase = /[A-Z]/.test(password);
  const hasLowerCase = /[a-z]/.test(password);
  const hasNumber = /[0-9]/.test(password);
  const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

  if (password.length < minLength) {
    return messages.minLength.replace("{minLength}", minLength);
  }
  if (!hasUpperCase) {
    return messages.hasUpperCase;
  }
  if (!hasLowerCase) {
    return messages.hasLowerCase;
  }
  if (!hasNumber) {
    return messages.hasNumber;
  }
  if (!hasSpecialChar) {
    return messages.hasSpecialChar;
  }

  return "";
};
