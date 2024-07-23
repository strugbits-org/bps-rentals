import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { createWixClient } from "@/utils/createWixClient";
import { NextResponse } from "next/server";

// PUT method handler
export const PUT = async (req) => {

  const body = await req.json()

  const { password } = body;
  const params = req.nextUrl.searchParams;
  const token = params.get('token');

  if (!token) {
    return NextResponse.json({ message: "Invalid token" }, { status: 400 });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const wixClient = await createWixClient();
    const memberData = await wixClient.items
      .queryDataItems({
        dataCollectionId: "F1UsersData",
      })
      .eq("email", decoded.email)
      .find();
    if (memberData._items.length === 0) {
      return NextResponse.json({ message: "Invalid token" }, { status: 400 });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    await wixClient.items.updateDataItem(
      memberData._items[0].data._id,
      {
        dataCollectionId: "F1UsersData",
        dataItemId: memberData._items[0].data._id,
        dataItem: {
          data: {
            ...memberData._items[0].data,
            password: hashedPassword,
          },
        },
      }
    );

    return NextResponse.json({ message: "Password updated successfully" }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Invalid token", reason: error.message }, { status: 400 });
  }
};