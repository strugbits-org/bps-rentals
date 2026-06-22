// Debug logging levels (DEBUG_LOGS, inlined at build via next.config.mjs so it
// works in both server and client bundles):
//   "1" -> full verbosity: every logError + logUpstreamError call
//   "2" -> only third-party / upstream errors (e.g. Wix or network failures):
//          any logError call that includes an error object, plus everything
//          logged via logUpstreamError
//   anything else / unset -> silent
const DEBUG_LEVEL = process.env.DEBUG_LOGS;

// Heuristic: does this argument look like a genuine third-party / upstream error
// (Wix SDK or network failure) rather than a plain app-level error?
// Discriminators:
//   - our UpstreamDataError sets isUpstreamError
//   - Wix SDK errors (e.g. code "WD_UNKNOWN_ERROR") and Node network errors
//     (e.g. "ENOTFOUND") expose a string `code`; a plain `new Error("...")`
//     thrown by our own code does not
//   - message signatures as a fallback
// This keeps app errors like `new Error("Category Data not found ...")` OUT of
// level 2 while still surfacing real Wix/network failures.
const looksLikeUpstreamError = (value) => {
    if (!value || typeof value !== "object") return false;
    if (value.isUpstreamError) return true;
    if (typeof value.code === "string" && value.code.length > 0) return true;
    if (value.applicationError || value.details?.applicationError) return true;
    const message = String(value.message || "");
    return /WDE\d+|wixData|WIXDATA|fetch failed|ECONN|ENOTFOUND|ETIMEDOUT|EAI_AGAIN/i.test(message);
};

// General debug logger. At full verbosity it logs everything; at level 2 it
// only logs when an error object is among the arguments.
const logError = (...args) => {
    if (DEBUG_LEVEL === "1") {
        console.error(...args);
    } else if (DEBUG_LEVEL === "2" && args.some(looksLikeUpstreamError)) {
        console.error(...args);
    }
};

// Explicitly log a third-party / upstream failure. Always shown at level 1 or 2,
// even when no error object is passed (e.g. plain status messages).
export const logUpstreamError = (...args) => {
    if (DEBUG_LEVEL === "1" || DEBUG_LEVEL === "2") console.error(...args);
};

export default logError;
