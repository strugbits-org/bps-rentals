const { isAuthenticated } = require('./isAuthenticated');

async function handleAuthentication(req) {
    try {
        const token = req.headers.get('authorization');
        if (!token) {
            throw new Error("Unauthorized: No token provided");
        }

        const authenticatedUserData = await isAuthenticated(token, 'HomePageContentF1');
        if (!authenticatedUserData) {
            throw new Error("Unauthorized access");
        }
        return authenticatedUserData;
    } catch (error) {
        console.error('Authentication error:', error);
        return null;  // Indicating that authentication failed
    }
}

export default handleAuthentication;