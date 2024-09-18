const isDebugMode = process.env.DEBUG_LOGS === "1";

const logError = (...args) => {
    if (isDebugMode) console.error(...args);
};

export default logError;