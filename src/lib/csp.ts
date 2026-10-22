// Enforced, not Report-Only: Vercel Hobby keeps runtime logs for one hour, so a report sink would have no reader.
// Next's inline flight scripts and the statically cached pages rule out nonces, hence 'unsafe-inline'.
// Turnstile needs its script and iframe origin (developers.cloudflare.com/turnstile/reference/content-security-policy).
// Vercel Analytics and Speed Insights load and report under /_vercel on the same origin.
const TURNSTILE = "https://challenges.cloudflare.com"

export function contentSecurityPolicy({ dev }: { dev: boolean }): string {
  return [
    "default-src 'self'",
    "base-uri 'self'",
    "form-action 'self'",
    "frame-ancestors 'none'",
    "object-src 'none'",
    // next dev evaluates code for its error overlay and HMR; production never does.
    `script-src 'self' 'unsafe-inline'${dev ? " 'unsafe-eval'" : ""} ${TURNSTILE}`,
    "style-src 'self' 'unsafe-inline'",
    "img-src 'self' data:",
    "font-src 'self'",
    "connect-src 'self'",
    `frame-src ${TURNSTILE}`,
  ].join("; ")
}
