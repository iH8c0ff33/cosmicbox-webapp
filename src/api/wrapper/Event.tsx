import * as React from "react"

import { getToken } from "../auth/service"
import { getEventsCount } from "../event"
import { Event } from "../type/event"
import { eventStreamWS } from "../url"

interface EventCountProps {
  count: number
}

export function withEventCount<P extends EventCountProps>(Component: React.ComponentType<P>) {
  interface State {
    count: number
  }

  return class extends React.Component<{}, State> {
    constructor(props: {}) {
      super(props)

      this.state = {
        count: -1
      }
    }

    componentDidMount() { this.getCount() }

    componentDidUpdate() {
      setTimeout(this.getCount.bind(this), process.env.NODE_ENV === "production" ? 60 : 5 * 1000)
    }

    getCount() { getEventsCount().then(count => this.setState({ count })) }

    render() { return <Component count={this.state.count} /> }
  }
}

const MAX_EVENTS = 50

interface EventStreamProps {
  events: Event[]
}

export function withEventStream<P extends EventStreamProps>(Component: React.ComponentType<P>) {
  interface State {
    events: Event[]
  }

  return class extends React.Component<{}, State> {
    private websocket: WebSocket

    constructor(props: {}) {
      super(props)

      this.state = {
        events: []
      }
    }

    componentDidMount() {
      this.websocket = new WebSocket(eventStreamWS, getToken() || "")
      this.websocket.onmessage = message =>
        this.setState({
          ...this.state,
          events: [Event.parse(message.data), ...this.state.events.slice(0, MAX_EVENTS - 1)]
        })
    }

    componentWillUnmount() { this.websocket.close() }

    render() { return <Component events={this.state.events} /> }
  }
}
