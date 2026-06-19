// Marks a Wix fetch failure (timeout/outage) vs a genuine "not found", so we
// throw (uncached 500) instead of notFound() (which caches a 404).
export class UpstreamDataError extends Error {
  constructor(message, cause) {
    super(message);
    this.name = "UpstreamDataError";
    this.isUpstreamError = true;
    if (cause !== undefined) this.cause = cause;
  }
}

export function isUpstreamDataError(error) {
  return Boolean(error && error.isUpstreamError);
}
