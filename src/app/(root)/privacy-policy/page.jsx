import { getPrivacyAndPolicyPageContent } from "@/Services/Index";
import PrivacyAndPolicy from "@/components/PrivacyAndPolicy";

export default async function Page() {
  const [privacyAndPolicy] = await Promise.all([
    getPrivacyAndPolicyPageContent(),
  ]);

  return <PrivacyAndPolicy data={privacyAndPolicy} />;
}
