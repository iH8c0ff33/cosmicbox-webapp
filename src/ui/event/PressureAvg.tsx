import { Box, Title, Subtitle } from "bloomer"
import * as React from "react"

interface Props {
  avg: number
}

export default class extends React.Component<Props> {
  render() {
    return (
      <Box>
        <Title>{this.props.avg.toFixed(3)}</Title>
        <Subtitle>Avg. press.</Subtitle>
      </Box>
    )
  }
}