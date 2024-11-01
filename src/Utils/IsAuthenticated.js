import jwt from "jsonwebtoken";

import { authWixClient, createWixClient } from "./CreateWixClient";
import logError from "./ServerActions";
import { extractPermissions } from "./checkPermissions";

export const isAuthenticated = async (token) => {
  try {
    
    if (!token) {
      throw new Error("Unauthorized: No token provided");
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const authClient = await authWixClient();
    const wixClient = await createWixClient();

    const privateMemberData = await authClient.items
      .queryDataItems({
        dataCollectionId: "Members/PrivateMembersData",
      })
      .eq("loginEmail", decoded.email)
      .find();

    const memberData = await wixClient.items
      .queryDataItems({
        dataCollectionId: "membersPassword",
      })
      .eq("userEmail", decoded.email)
      .find();

    const id = privateMemberData._items?.[0]?.data?._id;
    const memberBadges = await wixClient.badges.listBadgesPerMember([id]);

    const badgeIds = memberBadges?.memberBadgeIds?.[0]?.badgeIds || [];
    const permissions = extractPermissions(badgeIds);

    const loggedInUserData = {
      ...memberData._items[0].data,
      memberId: id,
      firstName: privateMemberData._items[0].data.firstName,
      lastName: privateMemberData._items[0].data.lastName,
      phone: privateMemberData._items[0].data.mainPhone,
      permissions: permissions
    };

    if (memberData._items.length === 0) {
      throw new Error("Unauthorized: No matching user data");
    }

    return loggedInUserData;
  } catch (error) {
    logError(error);
    throw new Error(`Unauthorized: ${error.message}`);
  }
};