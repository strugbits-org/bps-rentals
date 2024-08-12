import { NextResponse } from "next/server";

import handleAuthentication from "@/Utils/HandleAuthentication";
async function fetchData(url, options) {
  const response = await fetch(url, options);
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  return await response.json();
}
export const POST = async (req) => {
  try {
    const authenticatedUserData = await handleAuthentication(req);
    if (!authenticatedUserData) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }
    const body = await req.json();
    const { lineItems, customerDetails } = body;

    const {
      orderType,
      eventDate,
      deliveryDate,
      pickupDate,
      eventLocation,
      eventDescription,
      billTo,
      address,
      address2,
      city,
      state,
      zipCode,
      instructions,
      onSiteContact,
      telephone,
      preferredSalesPerson,
      customerName,
      customerEmail,
    } = customerDetails;
    // const lineItemsIdArr = lineItems.map((item) => item.id);

    let formatedEventDate = new Date(eventDate);
    let formatedDeliveryDate = new Date(deliveryDate);
    let formatedPickupDate = new Date(pickupDate);

    let customerObj = {
      orderis: orderType,
      eventDate: formatedEventDate.toISOString(),
      dilvDate: formatedDeliveryDate.toISOString(),
      pickupDate: formatedPickupDate.toISOString(),
      eventLocation: eventLocation,
      eventDescript: eventDescription,
      billingDetails: {
        customerAccNameToBill: billTo,
        streetAddress: address,
        addressline2: address2 ? address2 : "",
        city: city ? city : "",
        state: state ? state : "",
        zipCode: zipCode ? zipCode : "",
        specialInstructionsText: instructions ? instructions : "",
        onSiteContact: onSiteContact,
        telephone: telephone,
        nameeOrderedBy: customerName,
        emaillOrderedBy: customerEmail,
        prefferedSalesPerson: preferredSalesPerson ? preferredSalesPerson : "",
      },
    };
    let customer = {
      email: authenticatedUserData.userEmail,
      contactId: authenticatedUserData.memberId,
      address: {
        city: "",
      },
      billingAddress: {
        country: "USA",
        streetAddress: {
          value: address,
          type: "Name",
        },
        addressLine: address,
        addressLine2: address2,
        postalCode: zipCode,
        subdivision: "",
        city: city,
      },
      shippingAddress: {
        country: "",
        streetAddress: {
          value: eventLocation,
          type: "Name",
        },
      },
      phone: telephone,
      fullName: customerName,
    };

    const payload = {
      title: `Rentals Test Quote`,
      customer: customer,
      customerDetails: customerObj,
      lineItems,
      paymentTerms: {
        termData: "",
        termType: "DueOnReceipt",
      },
      dates: {
        issueDate: new Date(),
        validThroughDate: new Date(
          new Date().setDate(new Date().getDate() + 30)
        ),
      },
    };

    const response = await fetchData(
      `${process.env.RENTALS_URL}/rentalsPriceQuote`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      }
    );

    console.log(response, "quote response");

    return NextResponse.json(
      {
        message: "Price Quote Created",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
};
