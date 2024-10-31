import { encryptField } from "./Encrypt";
import { PERMISSIONS } from "./Schema/permissions";
import logError from "./ServerActions";

export const extractPermissions = (badgeIds) => {
    if (!process.env.ADMIN_BADGE_ID || 
        !process.env.FIREPROOF_CERTIFICATES_BADGE_ID || 
        !process.env.SHOW_PRICE_BADGE_ID || 
        !process.env.SHOW_DOCUMENTS_BADGE_ID) {
        throw new Error("System Error: One or more required badge environment variables are missing.");
    }

    const badgeToPermissionMap = {
        [process.env.ADMIN_BADGE_ID]: PERMISSIONS.ADMIN_PANEL_ACCESS,
        [process.env.FIREPROOF_CERTIFICATES_BADGE_ID]: PERMISSIONS.SHOW_FIREPROOF_CERTIFICATES,
        [process.env.SHOW_PRICE_BADGE_ID]: PERMISSIONS.SHOW_PRICES,
        [process.env.SHOW_DOCUMENTS_BADGE_ID]: PERMISSIONS.SHOW_DOCUMENTS,
    };

    const permissions = [];

    Object.keys(badgeToPermissionMap).forEach((badgeId) => {
        if (badgeIds.includes(badgeId)) {
            try {
                permissions.push(encryptField(badgeToPermissionMap[badgeId]));
            } catch (error) {
                logError(`System Error: Error encrypting permission for badge ID ${badgeId}: ${error.message}`);
            }
        }
    });

    return permissions;
};
