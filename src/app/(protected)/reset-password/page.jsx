import { Suspense } from "react";

import ResetPassword from "@/components/Authentication/ResetPassword";

export default async function Page() {
  return (
    <Suspense>
      <ResetPassword />;
    </Suspense>
  );
}
