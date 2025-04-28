export const validateConfirmPassword = (
  confirmPassword: string,
  newPassword: string
): boolean => {
  const res = confirmPassword.trim() === newPassword.trim();
  return res;
};
