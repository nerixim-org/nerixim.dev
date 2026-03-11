import type { NextRequest } from "next/server"
import { NextResponse } from "next/server"
import createMiddleware from "next-intl/middleware"
import { routing } from "./i18n/routing"

const handleI18nRouting = createMiddleware(routing)
const INTERNAL_LOCALE_REWRITE_HEADER = "x-internal-locale-rewrite"

function isDefaultLocalePath(pathname: string) {
  return pathname === "/en" || pathname.startsWith("/en/")
}

// biome-ignore lint/style/noDefaultExport: Next.js middleware entrypoints are default exports.
export default function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname

  // Next.js 16 re-invokes middleware for the internal `/en/...` rewrite target
  // created by `localePrefix: "as-needed"`. We tag only that internal rewrite
  // so direct `/en/...` requests still normalize back to the unprefixed URL.
  if (isDefaultLocalePath(pathname) && request.headers.get(INTERNAL_LOCALE_REWRITE_HEADER) === "1") {
    return NextResponse.next()
  }

  const response = handleI18nRouting(request)
  const rewrite = response.headers.get("x-middleware-rewrite")

  if (rewrite) {
    const rewritePathname = new URL(rewrite, request.url).pathname

    if (isDefaultLocalePath(rewritePathname)) {
      response.headers.set(`x-middleware-request-${INTERNAL_LOCALE_REWRITE_HEADER}`, "1")

      const overrideHeaders = response.headers.get("x-middleware-override-headers")
      const nextOverrideHeaders = new Set(
        overrideHeaders
          ?.split(",")
          .map((value) => value.trim())
          .filter(Boolean) ?? [],
      )

      nextOverrideHeaders.add(INTERNAL_LOCALE_REWRITE_HEADER)
      response.headers.set("x-middleware-override-headers", Array.from(nextOverrideHeaders).join(","))
    }
  }

  return response
}

export const config = {
  matcher: ["/((?!api|_next|_vercel|.*\\..*).*)"],
}
