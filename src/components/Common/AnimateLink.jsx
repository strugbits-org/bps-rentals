"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { pageLoadEnd, pageLoadStart } from "@/Utils/AnimationFunctions";

const AnimateLink = ({ to, children, className, target, attributes }) => {
  const router = useRouter();
  const pathname = usePathname();

  const delayedRedirect = (e) => {
    e.preventDefault();
    if (to === undefined || !to || to === "") return;

    if (pathname === to) {
      pageLoadStart();
      setTimeout(() => pageLoadEnd(), 900);
      return;
    }

    if (!target) {
      pageLoadStart();
      setTimeout(() => {
        if (typeof window !== "undefined") window.scrollTo({ top: 0, behavior: "auto" });
        setTimeout(() => {
          router.push(to);
          router.refresh();
        }, 300);
      }, 600);
    } else {
      window.open(to, target);
    }

  };

  return (
    <Link
      prefetch={false}
      href={to || ""}
      target={target}
      className={className}
      onClick={delayedRedirect}
      {...attributes}
    >
      {children}
    </Link>
  );
};
export default AnimateLink;
