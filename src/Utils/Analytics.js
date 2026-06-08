/**
 * Thin wrapper around the GA4 gtag interface loaded in CustomScripts.
 * Mirrors the inline pattern already used by the category Banner CTA.
 * Safe to call anywhere — silently no-ops if gtag isn't available (SSR, blocked, etc.).
 */
export const trackEvent = (eventName, params = {}) => {
    if (typeof window === "undefined" || typeof window.gtag !== "function") return;

    window.gtag("event", eventName, {
        page_location: window.location.href,
        ...params,
    });
};
