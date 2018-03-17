import "./EventsTable.css"

import { Table, Tag } from "bloomer"
import * as React from "react"

import { Event } from "../../api/type/event"

interface Props {
  events: Event[]
}

export class EventsTable extends React.Component<Props, {}> {
  render() {
    return (
      <div className="EventsTable">
        <Table isFullWidth={true}>
          <tbody>
            {this.props.events.map(event =>
              <tr key={event.id}>
                <td>{event.time.toJSON()}</td>
                <td><Tag>{event.press.toFixed(3)} hPa</Tag></td>
              </tr>
            )}
          </tbody>
        </Table>
      </div>
    )
  }
}