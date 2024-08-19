"use server"

import { createWixClient } from "./CreateWixClient";

export const getRole = async (memberId) => {
    try {        
        if (!memberId) return "user";
        const wixClient = await createWixClient();
        const memberBadges = await wixClient.badges.listBadgesPerMember([memberId]);
        const ADMIN_BADGE_ID = process.env.ADMIN_BADGE_ID;
        const isAdmin = memberBadges?.memberBadgeIds[0]?.badgeIds?.includes(ADMIN_BADGE_ID);
        
        return isAdmin ? "admin" : "user";
    } catch (error) {
        console.log("Error:", error);
        return "user";
    }
}