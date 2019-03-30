import { callAPI } from "./auth/service"
import { Bin } from "./type/event"
import { eventBinsURL, eventsCountURL, pressureAvgURL, eventRangeURL } from "./url"

export async function getEventsCount(): Promise<number> {
  const response = await callAPI(eventsCountURL)
  const text = await response.text()
  return Number(text)
}

export async function getPressureAvg(start: Date, end: Date): Promise<number> {
  const query = new URLSearchParams
  query.set("start", start.toJSON())
  query.set("end", end.toJSON())

  const response = await callAPI(`${pressureAvgURL}?${query}`)
  const text = await response.text()

  return Number(text)
}

export async function getEventBins(sample: string, start: Date, stop: Date) {
  const headers = new Headers()
  headers.append("Content-Type", "application/json")

  const response = await callAPI(eventBinsURL, {
    method: "POST",
    headers,
    body: JSON.stringify({ sample, start, stop })
  })

  if (response.status !== 200)
    throw new TypeError

  return Bin.parseMany(await response.text())
}

export async function deleteEventRange(start: Date = new Date, end: Date = new Date) {
  const headers = new Headers
  headers.append("Content-Type", "application/json")

  const response = await callAPI(eventRangeURL, {
    method: "DELETE", headers: { "Content-Type": "application/json" }, body: JSON.stringify({
      start, end, format: "2006-01-02T15:04:05Z07:00"
    })
  })
  if (response.status !== 200)
    throw new Error("failed to delete events")
}
