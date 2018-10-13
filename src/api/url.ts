export const baseURL = process.env.NODE_ENV === "production" ?
  "https://eee.lsgalfer.it" :
  "http://localhost:9000"

export const baseUIURL = process.env.NODE_ENV === "production" ?
  `${location.origin}/dashboard` :
  location.origin

export const callbackURL = `${baseUIURL}/callback`

export const apiURL = `${baseURL}/api`

export const wsBaseURL = process.env.NODE_ENV === "production" ?
  "wss://eee.lsgalfer.it/api" :
  "ws://localhost:9000/api"

export const loginURL = `${baseURL}/login`

export const eventURL = `${apiURL}/event`

export const eventsCountURL = `${eventURL}/count`
export const eventBinsURL = `${eventURL}/bins`

export const eventStreamWS = `${wsBaseURL}/event/stream`