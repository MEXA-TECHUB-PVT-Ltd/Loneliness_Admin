export const getLocalToken = () => {
  const userData = JSON.parse(localStorage.getItem("userData"));
  return userData?.token || undefined;
};
