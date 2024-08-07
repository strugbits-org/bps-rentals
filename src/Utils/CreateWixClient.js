import { ApiKeyStrategy, createClient, OAuthStrategy } from "@wix/sdk";
import { collections, items } from "@wix/data";
import { members, badges } from "@wix/members";
import { submissions } from "@wix/forms";
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
    },
    auth: ApiKeyStrategy({
      siteId: process.env.CLIENT_SITE_ID_WIX,
      apiKey: process.env.CLIENT_API_KEY_WIX,
    }),
  });
  return wixClient;
};
