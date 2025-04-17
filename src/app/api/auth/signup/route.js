import { NextResponse } from "next/server";

import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

import { cartWixClient, createWixClient } from "@/Utils/CreateWixClient";
import { isValidEmail, isValidPassword } from "@/Utils/AuthApisUtils";
import { extractPermissions } from "@/Utils/checkPermissions";
import logError from "@/Utils/ServerActions";
import { getMemberPricingTier } from "@/Services/Index";

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
      .query("membersPassword")
      .eq("userEmail", email)
      .find();

    if (memberData.items.length > 0) {
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
      `${process.env.RENTALS_URL}/createRentalsMember`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password, firstName, lastName, phone }),
      }
    );

    const responseData = await memberResponse.json();
    const memberResponseData = responseData.data;

    if (!memberResponseData) {
      return NextResponse.json(
        { message: "Error saving member data, please try again" },
        { status: 500 }
      )
    }

    const memberId = memberResponseData._id;
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    try {
      await wixClient.items.insert("membersPassword", {
        userEmail: email,
        userPassword: hashedPassword,
      });
    } catch (error) {
      return NextResponse.json(
        { message: "Error saving member data: " + error.message },
        { status: 500 }
      );
    }

    const memberBadges = await wixClient.badges.listBadgesPerMember([memberId]);
    const badgeIds = memberBadges?.memberBadgeIds?.[0]?.badgeIds || [];
    const permissions = extractPermissions(badgeIds);
    const pricingTier = await getMemberPricingTier(badgeIds);

    const memberTokens = await wixClient.auth.getMemberTokensForExternalLogin(
      memberId,
      process.env.CLIENT_API_KEY_WIX
    );

    if (body?.cartId) {
      const wixClient = await createWixClient();
      const visitorCart = await wixClient.cart.getCart(body.cartId);

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
      memberId: memberResponseData._id,
      loginEmail: email,
      firstName: firstName,
      lastName: lastName,
      mainPhone: phone,
      permissions: permissions,
      pricingTier: pricingTier,
    };

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
    logError("Error", error);
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
};
