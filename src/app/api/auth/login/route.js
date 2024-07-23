import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import { createWixClient } from "@/Utils/CreateWixClient";

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

    if (memberData._items.length > 0) {
      const isMatch = await bcrypt.compare(
        password,
        memberData._items[0]?.data?.userPassword
      );

      if (isMatch) {
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
