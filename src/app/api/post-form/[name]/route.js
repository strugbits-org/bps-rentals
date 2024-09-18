import { createWixClient } from "@/Utils/CreateWixClient";
import logError from "@/Utils/ServerActions";
import { NextResponse } from "next/server";

export const POST = async (req, { params }) => {
    const { name } = params;

    const wixClient = await createWixClient();

    if (name === "contact" || name === "newsletter") {
        const id = name === "contact" ? process.env.WIX_CLIENT_CORPORATE_CONTACT_FORM_ID : process.env.WIX_CLIENT_CORPORATE_NEWSLETTER_ID;
        const data = await req.json()

        const response = await wixClient.submissions.createSubmission({
            formId: id,
            status: "CONFIRMED",
            submissions: data,
        });
        return NextResponse.json(response, { status: 200 });
    } else {
        logError(error);
        return NextResponse.json({
            message: "Invalid query parameters, Please contact BE dev",
            body: req.body,
        }, { status: 400 });
    }
};