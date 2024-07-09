import Account from "@/components/Account/Index";
import SavedProducts from "@/components/Account/SavedProducts";

export default async function Page() {
  return (
    <Account>
      <SavedProducts />
    </Account>
  );
}
