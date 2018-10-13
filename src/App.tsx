import "./App.css"

import {
  Box,
  Column,
  Columns,
  Container,
  Hero,
  HeroBody,
  Navbar,
  NavbarBrand,
  NavbarItem,
  NavbarMenu,
  NavbarStart,
  Subtitle,
  Tile,
  Title,
} from "bloomer"
import * as React from "react"

import { getAuthURL, getToken } from "./api/auth/service"
import { eventStreamWS } from "./api/url"
import {
  MultiWebSocket,
  withEventCount,
  withEventStream,
  withPressureAvg
} from "./api/wrapper/Event"
import { EventCountBox } from "./ui/event/EventCountBox"
import { EventsCard } from "./ui/event/EventsCard"
import DownloadData from "./ui/timeframe/DownloadData"
import Pressure from "./ui/event/PressureAvg"

const multiWebSocket = new MultiWebSocket(eventStreamWS + `?access_token=${escape(getToken() || "")}`)

const EventCount = withEventCount(EventCountBox, multiWebSocket)
const EventStream = withEventStream(EventsCard, multiWebSocket)
const PressAvg = withPressureAvg(Pressure)

class App extends React.Component {
  render() {
    return (
      <>
        <Navbar>
          <Container>
            <NavbarBrand>
              <NavbarItem>EEE</NavbarItem>
            </NavbarBrand>
            <NavbarMenu>
              <NavbarStart>
                <NavbarItem>Home</NavbarItem>
              </NavbarStart>
            </NavbarMenu>
          </Container>
        </Navbar>
        <Container>
          <Hero isSize="small">
            <HeroBody>
              <Container>
                <Title>Dashboard</Title>
                <Subtitle>Here you can review some stuff</Subtitle>
              </Container>
            </HeroBody>
          </Hero>
          <Tile isAncestor hasTextAlign="centered">
            <Tile isParent>
              <Tile isChild>
                <EventCount />
              </Tile>
            </Tile>
            <Tile isParent>
              <Tile isChild>
                <Box>
                  <a href={getAuthURL()}>
                    <Title>97%</Title>
                  </a>
                  <Subtitle>Hit rate</Subtitle>
                </Box>
              </Tile>
            </Tile>
            <Tile isParent>
              <Tile isChild>
                <PressAvg />
              </Tile>
            </Tile>
          </Tile>
          <Columns>
            <Column isSize={6}>
              <EventStream />
            </Column>
            <Column isSize={6}>
              <DownloadData />
            </Column>
          </Columns>
        </Container>
      </>
    )
  }
}

export default App
