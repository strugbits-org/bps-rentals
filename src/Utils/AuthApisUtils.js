export function isValidPassword(password) {
  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()~<>?,./;:{}[\]|\\])[A-Za-z\d!@#$%^&*()~<>?,./;:{}[\]|\\]{6,}$/;
  return passwordRegex.test(password);
}

export function isValidEmail(email) {
  const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
  return emailRegex.test(email);
}
