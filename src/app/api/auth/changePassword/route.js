import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

import handleAuthentication from "@/Utils/HandleAuthentication";
import { createWixClient } from "@/Utils/CreateWixClient";

// POST method handler
export const POST = async (req) => {
  try {
    const authenticatedUserData = await handleAuthentication(req);

    if (!authenticatedUserData) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }
    const body = await req.json();
    const { oldPassword, newPassword } = body;

    const isMatch = await bcrypt.compare(
      oldPassword,
      authenticatedUserData.userPassword
    );

    if (!isMatch) {
      return NextResponse.json(
        {
          message:
            "The old password you entered is incorrect. Please try again.",
        },
        { status: 401 }
      );
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    const wixClient = await createWixClient();
    await wixClient.items.updateDataItem(authenticatedUserData._id, {
      dataCollectionId: "membersPassword",
      dataItemId: authenticatedUserData._id,
      dataItem: {
        data: {
          ...authenticatedUserData,
          userPassword: hashedPassword,
        },
      },
    });

    return NextResponse.json(
      { message: "Password updated successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
};
