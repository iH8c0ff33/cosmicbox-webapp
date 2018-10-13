export const baseURL = process.env.NODE_ENV === "production" ?
  "https://eee.lsgalfer.it" :
  "http://localhost:9000"

export const dashboardURL = process.env.NODE_ENV === "production" ?
  "/dashboard" : ""

export const callbackURL = `${location.origin + dashboardURL}/callback`

export const apiURL = `${baseURL}/api`

export const loginURL = `${baseURL}/login`

export const eventURL = `${apiURL}/event`

export const eventsCountURL = `${eventURL}/count`
export const eventBinsURL = `${eventURL}/bins`
export const eventRangeURL = `${eventURL}/range`
export const pressureAvgURL = `${eventURL}/press`

export const wsBaseURL = process.env.NODE_ENV === "production" ?
  "wss://eee.lsgalfer.it" :
  "ws://localhost:9000"

export const wsApiURL = `${wsBaseURL}/api`

export const eventStreamWS = `${wsApiURL}/event/stream`