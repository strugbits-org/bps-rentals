import { NextResponse } from "next/server";

import handleAuthentication from "@/Utils/HandleAuthentication";
import logError from "@/Utils/ServerActions";
import getDataFetchFunction from "@/Services/FetchFunction";

export const GET = async (req, context) => {
    try {
        const { params } = context;
        const id = params.id;

        const authenticatedUserData = await handleAuthentication(req);

        if (!authenticatedUserData) {
            return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
        }

        const response = await getDataFetchFunction({
            dataCollectionId: "DemoProductData",
            eq: [
                {
                    key: "product",
                    value: id
                }
            ],
            includeVariants: false,
        });

        return NextResponse.json(response, { status: 200 });
    } catch (error) {
        logError(error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
};