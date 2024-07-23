import { createWixClient } from "@/Utils/CreateWixClient";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";

export const POST = async (req) => {
  try {
    const body = await req.json();
    const { email, password } = body;

    const wixClient = await createWixClient();

    const memberData = await wixClient.items
      .queryDataItems({
        dataCollectionId: "F1UsersData",
      })
      .eq("email", email)
      .find();

    if (memberData._items.length > 0) {
      const isMatch = await bcrypt.compare(
        password,
        memberData._items[0]?.data?.password
      );

      if (isMatch) {
        const memberBadges = await wixClient.badges.listBadgesPerMember([
          memberData._items[0].data.memberId,
        ]);
        const badgeFromEnv = process.env.BADGE_ID_PROD;

        if (memberBadges?.memberBadgeIds[0]?.badgeIds?.includes(badgeFromEnv)) {
          const jwtToken = jwt.sign({ email: email }, process.env.JWT_SECRET, {
            expiresIn: "30d",
          });
          delete memberData._items[0].data.password;

          return NextResponse.json(
            {
              message: "Login successful",
              jwtToken,
              member: {
                ...memberData._items[0].data,
              },
            },
            { status: 200 }
          );
        } else {
          return NextResponse.json(
            { message: "The account is under approval" },
            { status: 401 }
          );
        }
      } else {
        return NextResponse.json(
          { message: "Invalid email or password" },
          { status: 401 }
        );
      }
    } else {
      return NextResponse.json(
        { message: "Invalid email or password" },
        { status: 401 }
      );
    }
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
};
