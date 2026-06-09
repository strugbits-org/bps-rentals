/**
 * Tracks which users have already submitted a 3D library access request, so they
 * see the confirmation screen instead of the form on subsequent visits.
 *
 * NOTE: This is client-side only (localStorage), keyed by member id/email. It is
 * per-browser — it won't follow the user across devices and clears if they clear
 * storage. A durable "under review" state would need backend persistence.
 */
import { decryptField } from "@/Utils/Encrypt";
import { PERMISSIONS } from "@/Utils/Schema/permissions";

const KEY = "bps_3d_access_requested";
const PENDING_INTENT_KEY = "bps_pending_3d_request";

/** Persist 3D-flow intent across login ↔ create-account view switches. */
export const set3dRequestIntent = (product) => {
    if (typeof window === "undefined") return;
    try {
        sessionStorage.setItem(PENDING_INTENT_KEY, JSON.stringify(product || {}));
    } catch {
        /* storage unavailable — non-fatal */
    }
};

export const clear3dRequestIntent = () => {
    if (typeof window === "undefined") return;
    try {
        sessionStorage.removeItem(PENDING_INTENT_KEY);
    } catch {
        /* non-fatal */
    }
};

export const is3dRequestIntentActive = () => {
    if (typeof window === "undefined") return false;
    return sessionStorage.getItem(PENDING_INTENT_KEY) !== null;
};

/** True while the user is in the product-page 3D access flow (any step). */
export const isIn3dAccessFlow = (toggleModal = "") =>
    is3dRequestIntentActive() ||
    toggleModal === "3d-request" ||
    toggleModal === "3d-confirmation";

export const get3dRequestIntentProduct = () => {
    if (typeof window === "undefined") return null;
    try {
        const raw = sessionStorage.getItem(PENDING_INTENT_KEY);
        return raw ? JSON.parse(raw) : null;
    } catch {
        return null;
    }
};

const readSet = () => {
    if (typeof window === "undefined") return [];
    try {
        return JSON.parse(window.localStorage.getItem(KEY) || "[]");
    } catch {
        return [];
    }
};

export const markRequested = (userKey) => {
    if (typeof window === "undefined" || !userKey) return;
    const set = readSet();
    if (!set.includes(userKey)) {
        set.push(userKey);
        try {
            window.localStorage.setItem(KEY, JSON.stringify(set));
        } catch {
            /* storage full / unavailable — non-fatal */
        }
    }
};

export const hasRequested = (userKey) => {
    if (!userKey) return false;
    return readSet().includes(userKey);
};

export const clearRequested = (userKey) => {
    if (typeof window === "undefined" || !userKey) return;
    const set = readSet().filter((key) => key !== userKey);
    try {
        if (set.length === 0) {
            window.localStorage.removeItem(KEY);
        } else {
            window.localStorage.setItem(KEY, JSON.stringify(set));
        }
    } catch {
        /* storage unavailable — non-fatal */
    }
};

export const getUserKeyFromUserData = (userData) => {
    if (!userData) return null;
    let parsed = userData;
    if (typeof userData === "string") {
        try {
            parsed = JSON.parse(userData);
        } catch {
            return null;
        }
    }
    return parsed?.memberId || parsed?.loginEmail || null;
};

/** Reset legacy app2.js d-none toggles so auth forms don't stack with 3D views. */
export const resetSubmenuAuthForms = () => {
    if (typeof document === "undefined") return;
    document.querySelector(".container-sign-in")?.classList.remove("d-none");
    document.querySelector(".container-create-account")?.classList.add("d-none");
    document.querySelector(".container-forgot-password")?.classList.add("d-none");
};

/**
 * After login/signup during the 3D access flow: stay in the submenu and route
 * to the request form (or close if they already have documents access).
 */
export const continue3dAccessAfterAuth = ({
    member,
    submenuLogin,
    button,
    setToggleModal,
    setPending3dRequest,
}) => {
    setPending3dRequest(false);
    resetSubmenuAuthForms();

    const permissions = member?.permissions?.map((p) => decryptField(p)) || [];
    if (permissions.includes(PERMISSIONS.SHOW_DOCUMENTS)) {
        clear3dRequestIntent();
        submenuLogin?.classList.remove("active");
        button?.classList.remove("active");
        setToggleModal("");
        return;
    }

    submenuLogin?.classList.add("active");
    const userKey = member?.memberId || member?.loginEmail;
    const nextView = hasRequested(userKey) ? "3d-confirmation" : "3d-request";
    setToggleModal(nextView);
    window.dispatchEvent(new CustomEvent("3d-request-view-open"));
};
