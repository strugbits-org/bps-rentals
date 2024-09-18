import { ApiKeyStrategy, createClient, OAuthStrategy } from "@wix/sdk";
import { collections, items } from "@wix/data";
import { members, badges } from "@wix/members";
import { submissions } from "@wix/forms";
import { cart, currentCart } from "@wix/ecom";
import { contacts } from "@wix/crm";
import logError from "./ServerActions";

export const createWixClientApiStrategy = async () => {
  try {
    const wixClient = createClient({
      modules: {
        collections,
        members,
        badges,
        items,
        cart,
        submissions,
        contacts
      },
      auth: ApiKeyStrategy({
        siteId: process.env.CLIENT_SITE_ID_WIX,
        apiKey: process.env.CLIENT_API_KEY_WIX,
      })
    });
    return wixClient;
  } catch (error) {
    logError("Error creating wix client API strategy: ", error);
  }
};

export const createWixClient = async () => {
  try {
    const wixClient = createClient({
      modules: {
        collections,
        members,
        badges,
        items,
        cart,
        submissions,
        currentCart,
      },
      auth: OAuthStrategy({ clientId: process.env.CLIENT_ID_WIX }),
    });
    return wixClient;
  } catch (error) {
    logError("Error creating wix client: ", error);
  }
};

export const authWixClient = async () => {
  try {
    const wixClient = createClient({
      modules: {
        items,
        members,
        currentCart,
      },
      auth: ApiKeyStrategy({
        siteId: process.env.CLIENT_SITE_ID_WIX,
        apiKey: process.env.CLIENT_API_KEY_WIX,
      }),
    });
    return wixClient;
  } catch (error) {
    logError("Error creating auth wix client: ", error);
  }
};

export const cartWixClient = async (memberTokens) => {
  try {
    const cartClient = createClient({
      modules: { currentCart },
      auth: OAuthStrategy({
        clientId: process.env.CLIENT_ID_WIX,
        tokens: memberTokens,
      }),
    });

    return cartClient;
  } catch (error) {
    logError("Error creating cart wix client: ", error);
  }
};