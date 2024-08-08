import { cartWixClient } from "@/Utils/CreateWixClient";
import handleAuthentication from "@/Utils/HandleAuthentication";
import { NextResponse } from "next/server";

export const POST = async (req) => {
  try {
    const authenticatedUserData = await handleAuthentication(req);
    if (!authenticatedUserData) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const { memberTokens, productData } = body;

    // const product = {
    //   lineItems: [
    //     {
    //       catalogReference: {
    //         appId: "215238eb-22a5-4c36-9e7b-e7c08025e04e",
    //         catalogItemId: "42c74d2b-da9b-082d-e4e0-1bb4030aa06b",
    //         options: {
    //           variantId: "ad80290d-29a4-44d6-88d0-cb554f0f0c51",
    //           customTextFields: {
    //             additonalInfo: "",
    //           },
    //         },
    //       },
    //       quantity: 5,
    //     },
    //   ],
    // };

    // const memberTokens = {
    //   accessToken: {
    //     value:
    //       "OauthNG.JWS.eyJraWQiOiJZSEJzdUpwSCIsImFsZyI6IkhTMjU2In0.eyJkYXRhIjoie1wiaW5zdGFuY2VcIjp7XCJpbnN0YW5jZUlkXCI6XCIyMmJlOTNjMy03YTQ3LTQ4NTItOTA0My01ZWMxYTlmNGExNzZcIixcImFwcERlZklkXCI6XCJiMjNlNGFjYS1mNWVjLTQzZDEtOTQ1Ny1mYzZiNDRhODBiNzhcIixcInNpZ25EYXRlXCI6XCIyMDI0LTA4LTA4VDE0OjAzOjI2Ljc1NFpcIixcInVpZFwiOlwiOWM5ZmUzMzktOGFhOC00Yzg2LTg0YTgtMjA3MDMxZTgzOTU4XCIsXCJwZXJtaXNzaW9uc1wiOlwiXCIsXCJkZW1vTW9kZVwiOmZhbHNlLFwic2l0ZU93bmVySWRcIjpcIjYyNjA3NWM4LThmMzEtNDRiMC1iZDY1LWU1ODU5ZThlMDlhNlwiLFwiYWlkXCI6XCIzZTUwZGFkZi1lZDg2LTQwOWYtYTE5MC0zODcwYzE4NDMxNDNcIixcInNpdGVNZW1iZXJJZFwiOlwiOWM5ZmUzMzktOGFhOC00Yzg2LTg0YTgtMjA3MDMxZTgzOTU4XCIsXCJtZXRhU2l0ZUlkXCI6XCI3OWQ4NjE1Ny1kMjVkLTRhYjUtYjQxNi05MzA0NWMwNTlkYmVcIixcImV4cGlyYXRpb25EYXRlXCI6XCIyMDI0LTA4LTA4VDE4OjAzOjI2Ljc1NFpcIixcImhhc1VzZXJSb2xlXCI6ZmFsc2UsXCJhb3JcIjpmYWxzZX19IiwiaWF0IjoxNzIzMTI1ODA2LCJleHAiOjE3MjMxNDAyMDZ9.kmO1aeSKXS9RMAKQs87NLkVh4VbBhOPSef5CjU-JEH0",
    //     expiresAt: 1723140206,
    //   },
    //   refreshToken: {
    //     value:
    //       "JWS.eyJraWQiOiJZSEJzdUpwSCIsImFsZyI6IkhTMjU2In0.eyJkYXRhIjoiXCIyMTBjMjkxMS04ZGJkLTQzMmUtOGQwMi1mM2VmZjc2ZGE3ODZcIiIsImlhdCI6MTcyMzEyNTgwNiwiZXhwIjoxNzU0NjYxODA2fQ.GrfGOb9npeaVnbOUcUafheaOfeaVJ0pP5JT6SkmjAG0",
    //     role: "member",
    //   },
    // };
    const cartClient = await cartWixClient(memberTokens);

    const response = await cartClient.currentCart.addToCurrentCart(productData);

    return NextResponse.json(response, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
};
