import { Card, CardFooter, CardFooterItem, CardHeader, CardHeaderTitle } from "bloomer"
import * as React from "react"

import { Event } from "../../api/type/event"
import { EventsTable } from "./EventsTable"

interface Props {
  events: Event[]
}

export class EventsCard extends React.Component<Props> {
  render() {
    return (
      <Card>
        <CardHeader>
          <CardHeaderTitle>Events</CardHeaderTitle>
        </CardHeader>
        <EventsTable events={this.props.events} />
        <CardFooter>
          <CardFooterItem>View all</CardFooterItem>
        </CardFooter>
      </Card>
    )
  }
}