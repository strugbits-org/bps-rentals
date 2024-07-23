import bcrypt from 'bcryptjs';
import { createWixClient } from "@/utils/createWixClient";
import { NextResponse } from "next/server";
import handleAuthentication from '@/utils/handleAuthentication';

// POST method handler
export const POST = async (req) => {
  try {
    const authenticatedUserData = await handleAuthentication(req);
    if (!authenticatedUserData) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }
    const body = await req.json()
    const { oldPassword, newPassword } = body;

    const isMatch = await bcrypt.compare(oldPassword, authenticatedUserData.password);

    if (!isMatch) {
      return NextResponse.json({ message: "The old password you entered is incorrect. Please try again." }, { status: 401 });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    const wixClient = await createWixClient();
    await wixClient.items.updateDataItem(authenticatedUserData._id, {
      dataCollectionId: "F1UsersData",
      dataItemId: authenticatedUserData._id,
      dataItem: {
        data: {
          ...authenticatedUserData
          , password: hashedPassword
        },
      },
    });

    return NextResponse.json({ message: "Password updated successfully" }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
};
