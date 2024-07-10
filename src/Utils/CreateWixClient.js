import { createClient, OAuthStrategy } from "@wix/sdk";
import { collections, items } from "@wix/data";
import { members, badges } from "@wix/members";
import { cart } from "@wix/ecom";

export const createWixClient = async () => {
  try {
    const wixClient = createClient({
      modules: {
        collections,
        members,
        badges,
        items,
        cart,
      },
      auth: OAuthStrategy({ clientId: process.env.CLIENT_ID_WIX }),
    });
    return wixClient;
  } catch (error) {
    console.error(error);
  }
};
