import { eventsCountURL, eventBinsURL } from "./url"
import { Bin } from "./type/event"

export async function getEventsCount(): Promise<number> {
  const response = await fetch(eventsCountURL)
  const text = await response.text()
  return Number(text)
}

export async function getEventBins(sample: string, start: Date, stop: Date) {
  const headers = new Headers()
  headers.append("Content-Type", "application/json")

  const response = await fetch(eventBinsURL, {
    method: "POST",
    headers,
    body: JSON.stringify({ sample, start, stop })
  })

  if (response.status !== 200)
    throw new TypeError

  return Bin.parseMany(await response.text())
}
