import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

import { createWixClient } from "@/Utils/CreateWixClient";

export const POST = async (req) => {
  try {
    const body = await req.json();

    const { email, password, firstName, lastName } = body;

    const wixClient = await createWixClient();

    const memberData = await wixClient.items
      .queryDataItems({
        dataCollectionId: "membersPassword",
      })
      .eq("userEmail", email)
      .find();

    if (memberData._items.length > 0) {
      return NextResponse.json(
        { message: "Email already exists" },
        { status: 403 }
      );
    }

    const user = await wixClient.auth.register({ email, password });

    if (
      user.loginState === "SUCCESS" ||
      user.errorCode === "emailAlreadyExists"
    ) {
      setTimeout(async () => {
        const payload = { loginEmail: email };
        const response = await fetch(`${process.env.RENTALS_URL}/getMember`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        });

        if (!response.ok) {
          throw new Error("Failed to get member from Wix");
        }

        const json = await response.json();

        try {
          const cartResponse = await wixClient.cart.createCart({
            lineItems: [
              {
                catalogReference: {
                  appId: "215238eb-22a5-4c36-9e7b-e7c08025e04e",
                  catalogItemId: "1",
                },
                quantity: 1,
              },
            ],
          });

          const salt = await bcrypt.genSalt(10);
          const hashedPassword = await bcrypt.hash(password, salt);

          await wixClient.items.insertDataItem({
            dataCollectionId: "membersPassword",
            dataItem: {
              data: {
                firstName,
                lastName,
                memberId: json.data.items[0]._id,
                userEmail: email,
                userPassword: hashedPassword,
                cartId: cartResponse._id,
              },
            },
          });

          // Email notification
          // const emailOptions = {
          //   method: "POST",
          //   headers: {
          //     "Content-Type": "application/json",
          //   },
          //   body: JSON.stringify({
          //     contactId: "4c14f669-db2d-45c3-aa13-b69108cde0b2",
          //     variables: {
          //       name: `${firstName} ${lastName}`,
          //       email,
          //     },
          //   }),
          // };

          // await fetch(
          //   `${process.env.RENTALS_URL}/registerNotification`,
          //   emailOptions
          // );
        } catch (error) {
          console.error(error);
        }
      }, 8000);
      return NextResponse.json({ message: "User registered successfully" });
    } else {
      return NextResponse.json(
        { message: `Server Error: ${user.loginState || "Unknown error"}` },
        { status: 400 }
      );
    }
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
};
