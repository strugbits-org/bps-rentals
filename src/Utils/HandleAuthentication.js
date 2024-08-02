const { isAuthenticated } = require("./IsAuthenticated");

async function handleAuthentication(req) {
  try {
    const token =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFzZEBnbWFpbC5jb20iLCJpYXQiOjE3MjI1ODgyMDIsImV4cCI6MTcyNTE4MDIwMn0.5qfsHKJQGpYjsLi5MDjH6kGB3-QTwr-Ve3D9M9KHFGE";
    if (!token) {
      throw new Error("Unauthorized: No token provided");
    }

    const authenticatedUserData = await isAuthenticated(token);
    if (!authenticatedUserData) {
      throw new Error("Unauthorized access");
    }
    return authenticatedUserData;
  } catch (error) {
    console.error("Authentication error:", error);
    return null; // Indicating that authentication failed
  }
}

export default handleAuthentication;
