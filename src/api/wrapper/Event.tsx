import * as React from "react"

import { getEventsCount } from "../event"
import { Event } from "../type/event"

type MessageHandler = (this: WebSocket, ev: MessageEvent) => void

export class MultiWebSocket {
  private websocket?: WebSocket
  private handlers: MessageHandler[]

  constructor(private url: string) {
    this.handlers = []
  }

  public addHandler(handler: MessageHandler) {
    if (this.websocket == null) this.init()
    this.handlers.push(handler)
  }

  public removeHandler(handler: MessageHandler) {
    const index = this.handlers.indexOf(handler)
    if (index > -1)
      this.handlers.splice(index, 1)
    if (this.websocket != null && this.handlers.length === 0) {
      this.websocket.close()
      this.websocket = undefined
    }
  }

  private init() {
    if (this.websocket != null) this.websocket.close()
    this.websocket = new WebSocket(this.url)
    this.websocket.onmessage = message =>
      this.handlers.forEach(handler =>
        handler.apply(this.websocket, [message])
      )
  }
}

interface EventCountProps {
  count: number
}

export function withEventCount<P extends EventCountProps>(Component: React.ComponentType<P>, ws: MultiWebSocket) {
  interface State {
    count: number
  }

  return class extends React.Component<{}, State> {
    private handler: MessageHandler

    constructor(props: {}) {
      super(props)

      this.state = {
        count: -1
      }

      this.handler = _ => this.count()
    }

    componentDidMount() { this.getCount() }

    componentWillUnmount() { ws.removeHandler(this.handler) }

    getCount() {
      getEventsCount().then(count => {
        this.setState({ count })
        ws.addHandler(this.handler)
        setTimeout(this.getCount.bind(this), 60 * 1000)
      })
    }

    render() { return <Component count={this.state.count} /> }

    private count() {
      this.setState({ ...this.state, count: this.state.count + 1 })
    }
  }
}

const MAX_EVENTS = 50

interface EventStreamProps {
  events: Event[]
}

export function withEventStream<P extends EventStreamProps>(Component: React.ComponentType<P>, ws: MultiWebSocket) {
  interface State {
    events: Event[]
  }

  return class extends React.Component<{}, State> {
    private handler: MessageHandler

    constructor(props: {}) {
      super(props)

      this.state = {
        events: []
      }

      this.handler = message => this.update(message.data)
    }

    componentDidMount() { ws.addHandler(this.handler) }

    componentWillUnmount() { ws.removeHandler(this.handler) }

    render() { return <Component events={this.state.events} /> }

    private update(data: string) {
      this.setState({
        ...this.state,
        events: [Event.parse(data), ...this.state.events.slice(0, MAX_EVENTS - 1)]
      })
    }
  }
}
