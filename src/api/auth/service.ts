import { loginURL } from "../url"

const AUTH_TOKEN_KEY = "aat"

export const getAuthURL = () =>
  `${loginURL}?redirect_uri=${escape(`${location.origin}/callback`)}&response_type=token`

export const setToken = (token: string) => localStorage.setItem(AUTH_TOKEN_KEY, token)

export const getToken = () => localStorage.getItem(AUTH_TOKEN_KEY)