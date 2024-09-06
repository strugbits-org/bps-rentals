import { ApiKeyStrategy, createClient, OAuthStrategy } from "@wix/sdk";
import { collections, items } from "@wix/data";
import { members, badges } from "@wix/members";
import { submissions } from "@wix/forms";
import { cart, currentCart } from "@wix/ecom";

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
      },
      auth: ApiKeyStrategy({
        siteId: process.env.CLIENT_SITE_ID_WIX,
        apiKey: process.env.CLIENT_API_KEY_WIX,
      })
    });
    return wixClient;
  } catch (error) {
    console.error(error);
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
      },
      auth: OAuthStrategy({ clientId: process.env.CLIENT_ID_WIX }),
    });
    return wixClient;
  } catch (error) {
    console.error(error);
  }
};

export const authWixClient = async () => {
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
    console.error("Error creating Wix cart client:", error);
    throw error;
  }
};