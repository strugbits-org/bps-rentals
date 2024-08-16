import { NextResponse } from "next/server";

import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

import { authWixClient, createWixClient } from "@/Utils/CreateWixClient";
import { isValidEmail, isValidPassword } from "@/Utils/AuthApisUtils";

export const POST = async (req) => {
  try {
    const body = await req.json();

    const { email, password, firstName, lastName, phone } = body;

    const wixClient = await createWixClient();

    if (!isValidEmail(email)) {
      return NextResponse.json(
        {
          message: "Enter a valid email address",
        },
        { status: 404 }
      );
    }

    const memberData = await wixClient.items
      .queryDataItems({
        dataCollectionId: "membersPassword",
      })
      .eq("userEmail", email)
      .find();

    if (memberData._items.length > 0) {
      return NextResponse.json(
        { message: "Email already exists" },
        { status: 403 }
      );
    }

    if (!isValidPassword(password)) {
      return NextResponse.json(
        {
          message:
            "Password must have 1 uppercase, 1 lowercase, 1 number, 1 symbol, minimum 6 characters",
        },
        { status: 404 }
      );
    }

    let jwtToken = jwt.sign({ email: email }, process.env.JWT_SECRET, {
      expiresIn: "30d",
    });

    const memberResponse = await fetch(
      `${process.env.RENTALS_URL}/createMember`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      }
    );

    const responseData = await memberResponse.json();
    const memberResponseData = responseData.data;

    const memberId = memberResponseData._id;
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    await wixClient.items.insertDataItem({
      dataCollectionId: "membersPassword",
      dataItem: {
        data: {
          userEmail: email,
          userPassword: hashedPassword,
        },
      },
    });

    const wixAuthClient = await authWixClient();

    const updatedData = {
      contact: {
        firstName: firstName,
        lastName: lastName,
        phones: [phone],
      },
    };

    const userUpdatedResponse = await wixAuthClient.members.updateMember(
      memberId,
      updatedData
    );

    const memberBadges = await wixClient.badges.listBadgesPerMember([memberId]);
    const ADMIN_BADGE_ID = process.env.ADMIN_BADGE_ID;
    const isAdmin =
      memberBadges?.memberBadgeIds[0]?.badgeIds?.includes(ADMIN_BADGE_ID);

    const memberTokens = await wixClient.auth.getMemberTokensForExternalLogin(
      memberId,
      process.env.CLIENT_API_KEY_WIX
    );

    const finalData = {
      memberId: userUpdatedResponse._id,
      loginEmail: userUpdatedResponse.loginEmail,
      firstName: userUpdatedResponse.contact.firstName,
      lastName: userUpdatedResponse.contact.lastName,
      mainPhone: userUpdatedResponse.contact.phones[0],
      role: isAdmin ? "admin" : "user",
    };

    // Email notification
    // const emailOptions = {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify({
    //     contactId: "4c14f669-db2d-45c3-aa13-b69108cde0b2",
    //     variables: {
    //       name: `${firstName} ${lastName}`,
    //       email,
    //     },
    //   }),
    // };

    // await fetch(
    //   `${process.env.RENTALS_URL}/registerNotification`,
    //   emailOptions
    // );

    return NextResponse.json(
      {
        message: "User registered successfully",
        jwtToken,
        member: finalData,
        userTokens: memberTokens,
        member: finalData,
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
};
