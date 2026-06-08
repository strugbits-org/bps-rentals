import { NextResponse } from "next/server";

import logError from "@/Utils/ServerActions";

// Relays a 3D library access request to the Wix backend, which fires the
// "request3dAccess" triggered email to access@blueprintstudios.com.
export const POST = async (req) => {
  try {
    if (!process.env.RENTALS_URL) {
      throw new Error("RENTALS_URL is not configured");
    }

    const body = await req.json();
    const {
      firstName,
      lastName,
      email,
      company,
      usage,
      note,
      productName,
      productSlug,
    } = body;

    const response = await fetch(`${process.env.RENTALS_URL}/request3dAccess`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        firstName: firstName || "",
        lastName: lastName || "",
        email: email || "",
        company: company || "",
        usage: usage || "",
        note: note || "",
        productName: productName || "",
        productSlug: productSlug || "",
      }),
    });

    if (!response.ok) {
      throw new Error(`Triggered email request failed with status ${response.status}`);
    }

    return NextResponse.json({ message: "3D access request sent" }, { status: 200 });
  } catch (error) {
    logError("Error sending 3D access request:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
};
