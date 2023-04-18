import { useLocation } from "@remix-run/react";

const LOGIN_PATH = "/login";
const REDIRECT_KEY = "return_to";
const DEFAULT_URL = "/";

export function useLoginRedirect(): string {
  const location = useLocation();
  const params = new URLSearchParams({
    [REDIRECT_KEY]: location.pathname,
  });

  return `${LOGIN_PATH}?${params}`;
}

export function getRedirectUrl(request: Request): string {
  const url = new URL(request.url);
  const redirectUrl = url.searchParams.get(REDIRECT_KEY) ?? DEFAULT_URL;
  return redirectUrl;
}
