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
      pageLoadStart({ noScroll: true });
      setTimeout(() => pageLoadEnd(), 900);
      return;
    }

    if (target === undefined || !target || target === "") {
      pageLoadStart({});
      setTimeout(() => {
        router.push(to);
        router.refresh();
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
