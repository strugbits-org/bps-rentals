import { NextResponse } from "next/server";

import { createWixClient } from "@/Utils/CreateWixClient";
import handleAuthentication from "@/Utils/HandleAuthentication";

// POST method handler
export const POST = async (req) => {
  try {
    const authenticatedUserData = await handleAuthentication(req);
    if (!authenticatedUserData) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();

    const { firstName, lastName, company, phone, hospitalityLoc } = body;

    const wixClient = await createWixClient();
    const memberData = await wixClient.items
      .queryDataItems({
        dataCollectionId: "membersPassword",
      })
      .eq("userEmail", authenticatedUserData.userEmail)
      .find();

    const updatedData = {
      ...memberData.items[0].data,
      firstName,
      lastName,
      company,
      phone,
      hospitalityLoc,
    };

    await wixClient.items.updateDataItem(authenticatedUserData._id, {
      dataCollectionId: "membersPassword",
      dataItemId: authenticatedUserData._id,
      dataItem: { data: updatedData },
    });

    return NextResponse.json(
      { message: "Profile updated successfully", member: updatedData },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
};
