"use client";
import { useRouter } from "next/navigation";
import { pageLoadStart } from "@/Utils/AnimationFunctions";

/**
 * Confirmation view of the login submenu (data-form-active="3d-confirmation").
 * Shown after a request is submitted.
 */
const Request3dConfirmation = ({ setToggleModal }) => {
  const router = useRouter();

  const handleGoToDashboard = () => {
    const submenuLogin = document.querySelector(".submenu-login");
    if (submenuLogin) submenuLogin.classList.remove("active");
    setToggleModal("");
    pageLoadStart();
    router.push("/my-account");
  };

  return (
    <div className="container-3d-confirm">
      <h2 className="request-access-title fs--40 fs-phone-30 fw-600">
        Request submitted
      </h2>
      <p className="fs--16 fs-mobile-14 mb-20">
        We&apos;ll review and email you within 1 business day. Once approved, the full 3D library is
        available in your account dashboard.
      </p>

      <div className="confirm-3d-perks">
        <h3 className="fs--12">What you&apos;ll get access to</h3>
        <ul>
          <li>500+ 3D models — every product in the Blueprint catalog</li>
          <li>OBJ, FBX and GLTF formats included</li>
          <li>New models added as catalog grows</li>
        </ul>
      </div>

      <div className="container-submit col-12 mt-20">
        <button type="button" className="bt-submit btn-blue w-100" onClick={handleGoToDashboard}>
          <span>Go to my dashboard</span>
        </button>
      </div>
    </div>
  );
};

export default Request3dConfirmation;
