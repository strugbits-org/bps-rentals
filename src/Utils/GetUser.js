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
      console.error("Error parsing user data from cookie", error);
    }
  }
  return null;
};

export const getUserAuth = () => {
  const authToken = getCookie("authToken");
  if (authToken) {
    return authToken;
  }
  return null;
};
let authToken = null;
export const setAuthToken = (token) => {
  authToken = token;
};

export const getToken = () => {
  // return authToken;
  if (authToken) {
    return authToken
  } else {
    const getTheToken = getCookie("authToken")
    if (getTheToken) {
      authToken = getTheToken
    }
    return getTheToken
  }
};