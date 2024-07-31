import jwt from 'jsonwebtoken';
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";
import { createWixClient } from "@/Utils/CreateWixClient";

// PUT method handler
export const PUT = async (req) => {
  const body = await req.json();

  const { password } = body;
  const params = req.nextUrl.searchParams;
  const token = params.get("token");

  if (!token) {
    return NextResponse.json({ message: "Invalid token" }, { status: 400 });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const wixClient = await createWixClient();
    const memberData = await wixClient.items
      .queryDataItems({
        dataCollectionId: "membersPassword",
      })
      .eq("userEmail", decoded.email)
      .find();
    if (memberData._items.length === 0) {
      return NextResponse.json({ message: "Invalid token" }, { status: 400 });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    console.log(password, "password>>");
    const res = await wixClient.items.updateDataItem(
      memberData._items[0].data._id,
      {
        dataCollectionId: "membersPassword",
        dataItemId: memberData._items[0].data._id,
        dataItem: {
          data: {
            ...memberData._items[0].data,
            userPassword: hashedPassword,
          },
        },
      }
    );
    console.log(res, "res");
    return NextResponse.json(
      { message: "Password updated successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Invalid token", reason: error.message },
      { status: 400 }
    );
  }
};