import TermsAndCondition from "@/components/TermsAndCondition";
import { getTermsOfUsePageContent } from "@/Services/Index";

export default async function Page() {
  const [termsOfUse] = await Promise.all([getTermsOfUsePageContent()]);
  return <TermsAndCondition data={termsOfUse} />;
}
