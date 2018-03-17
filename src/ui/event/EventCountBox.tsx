import { Box, Subtitle, Title } from "bloomer"
import * as React from "react"

interface Props {
  count: number
}

export class EventCountBox extends React.Component<Props> {
  render() {
    return (
      <Box>
        <Title>{this.props.count}</Title>
        <Subtitle>Events</Subtitle>
      </Box>
    )
  }
}