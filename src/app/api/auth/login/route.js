import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import { authWixClient, cartWixClient, createWixClient, createWixClientApiStrategy } from "@/Utils/CreateWixClient";
import logError from "@/Utils/ServerActions";
import { extractPermissions } from "@/Utils/checkPermissions";

export const POST = async (req) => {
  try {
    const body = await req.json();
    const { email, password } = body;

    const wixClientApi = await createWixClientApiStrategy();

    const memberData = await wixClientApi.items
      .queryDataItems({
        dataCollectionId: "membersPassword",
      })
      .eq("userEmail", email)
      .find();

    if (memberData._items.length === 0) {
      return NextResponse.json(
        { message: "No user found with the provided email" },
        { status: 401 }
      );
    }

    const isMatch = await bcrypt.compare(
      password,
      memberData._items[0]?.data?.userPassword
    );

    if (!isMatch) {
      return NextResponse.json(
        { message: "Invalid Password" },
        { status: 401 }
      );
    }

    const jwtToken = jwt.sign({ email: email }, process.env.JWT_SECRET, {
      expiresIn: "30d",
    });
    delete memberData._items[0].data.password;

    const authClient = await authWixClient();

    const privateMemberData = await authClient.items
      .queryDataItems({
        dataCollectionId: "Members/PrivateMembersData",
      })
      .eq("loginEmail", email)
      .find();

    const selectedMemberData = privateMemberData._items[0].data;

    const wixClient = await createWixClient();

    const { _id: memberId } = selectedMemberData;
    const memberBadges = await wixClient.badges.listBadgesPerMember([memberId]);
    const badgeIds = memberBadges?.memberBadgeIds?.[0]?.badgeIds || [];
    const permissions = extractPermissions(badgeIds);
  
    const memberTokens = await wixClient.auth.getMemberTokensForExternalLogin(
      selectedMemberData._id,
      process.env.CLIENT_API_KEY_WIX
    );

    if (body?.cartId) {
      const visitorCart = await wixClientApi.cart.getCart(body.cartId);

      const cartClient = await cartWixClient(memberTokens);
      const lineItems = visitorCart.lineItems.map(x => ({
        catalogReference: x.catalogReference,
        quantity: x.quantity
      }));
      if (lineItems.length !== 0) {
        await cartClient.currentCart.addToCurrentCart({ lineItems });
      }
    }

    const finalData = {
      memberId: selectedMemberData._id,
      loginEmail: selectedMemberData.loginEmail,
      firstName: selectedMemberData.firstName,
      lastName: selectedMemberData.lastName,
      mainPhone: selectedMemberData.mainPhone,
      permissions: permissions
    };

    return NextResponse.json(
      {
        message: "Login successful",
        jwtToken,
        userTokens: memberTokens,
        member: finalData,
      },
      { status: 200 }
    );
  } catch (error) {
    logError("error", error);

    return NextResponse.json({ message: error.message }, { status: 500 });
  }
};
