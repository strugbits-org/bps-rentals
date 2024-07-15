import Account from "@/components/Account/Index";
import MyAccount from "@/components/Account/MyAccount";
import { getMyAccountPageContent } from "@/Services/MyAccountApis";

export default async function Page() {
  const [myAccountPageContent] = await Promise.all([getMyAccountPageContent()]);
  return (
    <Account>
      <MyAccount myAccountPageContent={myAccountPageContent} />
    </Account>
  );
}
