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

import { getAuthURL } from "./api/auth/service"
import { withEventCount, withEventStream } from "./api/wrapper/Event"
import { EventCountBox } from "./ui/event/EventCountBox"
import { EventsCard } from "./ui/event/EventsCard"

const EventCount = withEventCount(EventCountBox)
const EventStream = withEventStream(EventsCard)

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
          <Columns>
            <Column isSize={9}>
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
                      <Title>97%</Title>
                      <Subtitle>Hit rate</Subtitle>
                    </Box>
                  </Tile>
                </Tile>
                <Tile isParent>
                  <Tile isChild>
                    <Box>
                      <a href={getAuthURL()}>
                        <Title>954 hPa</Title>
                      </a>
                      <Subtitle>Avg. press.</Subtitle>
                    </Box>
                  </Tile>
                </Tile>
              </Tile>
              <Columns>
                <Column isSize={6}>
                  <EventStream />
                </Column>
              </Columns>
            </Column>
          </Columns>
        </Container>
      </>
    )
  }
}

export default App
