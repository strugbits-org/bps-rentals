import { NextResponse } from "next/server";

import { createWixClientApiStrategy } from "@/Utils/CreateWixClient";
import { isValidEmail } from "@/Utils/AuthApisUtils";
import logError from "@/Utils/ServerActions";

export const POST = async (req) => {
  const body = await req.json();
  const { email } = body;

  try {
    const wixClient = await createWixClientApiStrategy();

    const invalidEmail = isValidEmail(email);
    if (!invalidEmail) {
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

    if (memberData._items.length === 0) {
      return NextResponse.json(
        { message: "Account with this email does not exist" },
        { status: 404 }
      );
    }

    const currentDate = new Date();
    const twoHoursLater = new Date(currentDate.getTime() + 2 * 60 * 60 * 1000);

    const formattedDate = twoHoursLater.toLocaleString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    });

    const selectedMemberData = memberData._items[0].data;

    const userData = {
      ...memberData.items[0].data,
      emailToken: formattedDate,
    };

    const res = await wixClient.items.updateDataItem(selectedMemberData._id, {
      dataCollectionId: "membersPassword",
      dataItemId: selectedMemberData._id,
      dataItem: { data: userData },
    });

    const userId = res.dataItem._id;

    const origin = process.env.BASE_URL;
    const resetUrl = `${origin}/reset-password?reset-id=${encodeURIComponent(
      userId
    )}`;

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
    logError(error);
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
};
