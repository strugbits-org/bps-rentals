import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import { authWixClient, createWixClient } from "@/Utils/CreateWixClient";

export const POST = async (req) => {
  try {
    const body = await req.json();
    const { email, password } = body;

    const wixClient = await createWixClient();

    const memberData = await wixClient.items
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

    const memberBadges = await wixClient.badges.listBadgesPerMember([selectedMemberData._id]);
    const ADMIN_BADGE_ID = process.env.ADMIN_BADGE_ID;
    const isAdmin = memberBadges?.memberBadgeIds[0]?.badgeIds?.includes(ADMIN_BADGE_ID);

    const memberTokens = await wixClient.auth.getMemberTokensForExternalLogin(
      selectedMemberData._id,
      process.env.CLIENT_API_KEY_WIX
    );

    const finalData = {
      memberId: selectedMemberData._id,
      loginEmail: selectedMemberData.loginEmail,
      firstName: selectedMemberData.firstName,
      lastName: selectedMemberData.lastName,
      mainPhone: selectedMemberData.mainPhone,
      role: isAdmin ? "admin" : "user",
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
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
};
