/**
 * Tracks which users have already submitted a 3D library access request, so they
 * see the confirmation screen instead of the form on subsequent visits.
 *
 * NOTE: This is client-side only (localStorage), keyed by member id/email. It is
 * per-browser — it won't follow the user across devices and clears if they clear
 * storage. A durable "under review" state would need backend persistence.
 */
const KEY = "bps_3d_access_requested";

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
