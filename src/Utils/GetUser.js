import logError from "./ServerActions";

function getCookie(name) {
  if (typeof document !== "undefined") {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(";").shift();
  }
  return null;
}

export const getUserData = () => {
  const userDataCookie = getCookie("userData");
  if (userDataCookie) {
    try {
      const userData = JSON.parse(decodeURIComponent(userDataCookie));
      return userData;
    } catch (error) {
      logError("Error parsing user data from cookie", error);
    }
  }
  return null;
};
