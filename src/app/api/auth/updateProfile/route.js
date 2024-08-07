import { NextResponse } from "next/server";

import { createWixClient } from "@/Utils/CreateWixClient";
import handleAuthentication from "@/Utils/HandleAuthentication";

import { ApiKeyStrategy, createClient } from "@wix/sdk";
import { collections, items } from "@wix/data";
import { members, badges } from "@wix/members";
import { submissions } from "@wix/forms";
import { cart } from "@wix/ecom";

export const authWixClient = async () => {
  const wixClient = createClient({
    modules: {
      items,
      members,
    },
    auth: ApiKeyStrategy({
      siteId: "79d86157-d25d-4ab5-b416-93045c059dbe",
      apiKey:
        "IST.eyJraWQiOiJQb3pIX2FDMiIsImFsZyI6IlJTMjU2In0.eyJkYXRhIjoie1wiaWRcIjpcImQwMDJjMGZlLTRiMzktNDI1ZC05MDg2LTBjZDQ5ZTE5MTIzMlwiLFwiaWRlbnRpdHlcIjp7XCJ0eXBlXCI6XCJhcHBsaWNhdGlvblwiLFwiaWRcIjpcIjk0MGJhNjgyLWM0MmYtNDhjZS04NTAxLTRmZmE4MTFiODI2M1wifSxcInRlbmFudFwiOntcInR5cGVcIjpcImFjY291bnRcIixcImlkXCI6XCI2MjYwNzVjOC04ZjMxLTQ0YjAtYmQ2NS1lNTg1OWU4ZTA5YTZcIn19IiwiaWF0IjoxNzIyODQ4NTI1fQ.Olz7Zdltuymj3W9n4lK-SJVrccH5hkO-GVsA0cMPqex9BxDEeDXcIAmLfpBy2QhDWXf-mvN5VXPnzuS7HDD1nPDhxaEPcOljgD1_jec-O8S1I5a6zpE9t6Yjjulj9hfjv-5m9KxUnKrATEU1XfGrVnTeITidZ26KQImRxcmxxn24Ahyuh4q2CresegSBfxWfbfYY0O4wrYNlzvldOMhc-qreMvFVF0PIO47KMqVuLSk62ig72baNLt7f0I3TouCCcuVSltQvDaIRIxFXwj1DboG3NSpf9CAHZQRky_SZVp_QXXyt0_5SjAJhIoQ32jIQoTMI1JbO4Cm1UN2PyMqtww",
    }),
  });
  return wixClient;
};

export const POST = async (req) => {
  try {
    const authenticatedUserData = await handleAuthentication(req);

    if (!authenticatedUserData) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const { firstName, lastName, phone } = body;
    const { memberId } = authenticatedUserData;

    const wixClient = await authWixClient();

    const updatedData = {
      contact: {
        firstName: firstName,
        lastName: lastName,
        phones: [phone],
      },
    };

    const response = await wixClient.members.updateMember(
      memberId,
      updatedData
    );

    const finalData = {
      loginEmail: response.loginEmail,
      firstName: response.contact.firstName,
      lastName: response.contact.lastName,
      mainPhone: response.contact.phones[0],
    };

    return NextResponse.json(
      { message: "Profile updated successfully", updatedMember: finalData },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
};
