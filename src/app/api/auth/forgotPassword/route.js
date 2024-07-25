import { createWixClient } from "@/Utils/CreateWixClient";
import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";

// POST method handler
export const POST = async (req) => {
  try {
    const body = await req.json();
    console.log(body, "email body");
    const { email } = body;
    const wixClient = await createWixClient();
    const memberData = await wixClient.items
      .queryDataItems({
        dataCollectionId: "membersPassword",
      })
      .eq("userEmail", email)
      .find();

    if (memberData._items.length === 0) {
      return NextResponse.json({ message: "Email not found" }, { status: 404 });
    }

    const token = jwt.sign({ email: email }, process.env.JWT_SECRET, {
      expiresIn: "30m",
    });
    const origin = process.env.BASE_URL; // we will have to check the origin
    const resetUrl = `${origin}/reset-password?token=${token}`;

    const options = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        memberId: memberData._items[0].data.memberId,
        variables: {
          name: memberData._items[0].data.firstName,
          link: resetUrl,
        },
      }),
    };

    const response = await fetch(
      `${process.env.RENTALS_URL}/rentalsResetPassword`,
      options
    );
    if (!response.ok) {
      return NextResponse.json(
        { message: "Email could not be sent" },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { message: "Email has been sent" },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
};
