import { loginURL, callbackURL, csrfTokenURL } from "../url"

const AUTH_TOKEN_KEY = "aat"

export const getAuthURL = () =>
  `${loginURL}?redirect_uri=${escape(callbackURL)}&response_type=token`

export const login = () => location.replace(getAuthURL())

export const setToken = (token: string) => localStorage.setItem(AUTH_TOKEN_KEY, token)

export const getToken = () => localStorage.getItem(AUTH_TOKEN_KEY)

export const getCsrfToken = () => fetch(csrfTokenURL, { headers: { "Authorization": `Bearer ${getToken() || ""}` } })

export const callAPI = async (input: RequestInfo, init?: RequestInit) => fetch(input, {
  ...init,
  headers: {
    ...(init != null ? init.headers : null),
    "Authorization": `Bearer ${getToken() || ""}`,
    ...(init != null && init.method !== "GET" ? { "X-CSRF-TOKEN": await (await getCsrfToken()).text() } : null)
  }
})
