import ChangePassword from "@/components/Account/ChangePassword";
import Account from "@/components/Account/Index";
import { getChangePasswordPageContent } from "@/Services/MyAccountApis";

export default async function Page() {
  const [changePasswordPageContent] = await Promise.all([
    getChangePasswordPageContent(),
  ]);

  return (
    <Account>
      <ChangePassword changePasswordPageContent={changePasswordPageContent} />
    </Account>
  );
}
