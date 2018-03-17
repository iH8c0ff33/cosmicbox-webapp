import { loginURL } from "../url"

const AUTH_TOKEN_KEY = "aat"

export const getAuthURL = () =>
  `${loginURL}?redirect_uri=${escape(`${location.origin}/callback`)}&response_type=token`

export const login = () => location.replace(getAuthURL())

export const setToken = (token: string) => localStorage.setItem(AUTH_TOKEN_KEY, token)

export const getToken = () => localStorage.getItem(AUTH_TOKEN_KEY)

export const callAPI = (input: RequestInfo, init?: RequestInit) => fetch(input, {
  ...init,
  headers: {
    ...(init != null ? init.headers : null),
    "Authorization": `Bearer ${getToken() || login()}`
  }
})