// Debug logging levels (DEBUG_LOGS, inlined at build via next.config.mjs so it
// works in both server and client bundles):
//   "1" -> full verbosity: general debug logs + third-party/upstream errors
//   "2" -> only third-party/upstream errors (e.g. Wix fetch failures)
//   anything else / unset -> silent
const DEBUG_LEVEL = process.env.DEBUG_LOGS;

// General debug logs: shown only at full verbosity (DEBUG_LOGS === "1").
const logError = (...args) => {
    if (DEBUG_LEVEL === "1") console.error(...args);
};

// Third-party / upstream failures (e.g. Wix returning an error): shown at
// DEBUG_LOGS === "1" or "2".
export const logUpstreamError = (...args) => {
    if (DEBUG_LEVEL === "1" || DEBUG_LEVEL === "2") console.error(...args);
};

export default logError;
