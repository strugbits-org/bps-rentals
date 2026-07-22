"use client";
import { useCookies } from "react-cookie";

import useUserData from "@/Hooks/useUserData";
import { ATTACHMENT_TYPES, PERMISSIONS } from "@/Utils/Schema/permissions";
import { trackEvent } from "@/Utils/Analytics";
import { hasRequested } from "@/Utils/Request3dAccess";
import ThreeDSVG from "../svgs/ThreeDSVG";

/**
 * Upsell badge shown on products that ship a "3d-models" attachment, but only to
 * users WITHOUT documents access (who therefore can't see/download the 3D files).
 * 3D files are part of the unified SHOW_DOCUMENTS permission, so anyone holding
 * that permission already sees them in ProductDocuments and needs no upsell.
 *
 * The CTA opens the request flow inside the existing login submenu (Navbar) via a
 * window event: guests log in first, logged-in users go straight to the form.
 */
export const Product3dModelBadge = ({ selectedProductDetails }) => {
    const { permissions, memberId, email } = useUserData();
    const [cookies] = useCookies(["authToken"]);

    const SHOW_DOCUMENTS = permissions?.includes(PERMISSIONS.SHOW_DOCUMENTS);
    const isLoggedIn = Boolean(cookies.authToken && cookies.authToken !== "undefined");

    // Already has access — the files render in ProductDocuments, no upsell needed.
    if (SHOW_DOCUMENTS) return null;

    const productDocuments = selectedProductDetails?.productDocuments;
    const has3dModels = Array.isArray(productDocuments) && productDocuments.some(
        (doc) => doc.attachmentType === ATTACHMENT_TYPES.THREE_D_MODELS
    );
    if (!has3dModels) return null;

    const handleGetAccess = () => {
        const product = {
            name: selectedProductDetails?.product?.name || "",
            slug: selectedProductDetails?.product?.slug || "",
        };
        trackEvent("request_3d_access_click", {
            product_name: product.name,
            product_slug: product.slug,
        });
        // If this user already requested access, open straight to the confirmation.
        const alreadyRequested = isLoggedIn && hasRequested(memberId || email);
        window.dispatchEvent(
            new CustomEvent("open-3d-request", { detail: { product, isLoggedIn, alreadyRequested } })
        );
    };

    return (
        <div className="container-3d-access" data-aos="fadeIn .8s ease-in-out">
            <div className="container-3d-access-icon">
                <ThreeDSVG />
            </div>
            <div className="container-3d-access-info">
                <h3 className="container-3d-access-title fs--16 fs-phone-14">
                    3D model available
                </h3>
                <p className="container-3d-access-subtitle fs--12 fs-phone-12">
                    Part of the Blueprint 3D library
                </p>
            </div>
            <button type="button" className="btn-3d-access disable-click-outside" onClick={handleGetAccess}>
                <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                >
                    <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
                    <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
                    <line x1="12" y1="22.08" x2="12" y2="12" />
                </svg>
                <span>Get 3D library access</span>
            </button>
        </div>
    );
};
